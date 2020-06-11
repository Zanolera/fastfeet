import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
    async index(req, res) {
        const { page = 1, name = '%' } = req.query;

        const deliverymans = await Deliveryman.findAll({
            where: {
                name: {
                    [Op.like]: name,
                },
            },
            order: ['name'],
            attributes: ['id', 'name', 'email'],
            limit: 20,
            offset: (page - 1) * 20, // How many records will skip
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['path', 'url'],
                },
            ],
        });

        return res.json(deliverymans);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            avatar_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const deliverymanExists = await Deliveryman.findOne({
            where: { email: req.body.email },
        });

        if (deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Deliveryman already exists.' });
        }

        const { avatar_id } = req.body;

        if (avatar_id) {
            const fileExists = await File.findByPk(avatar_id);

            if (!fileExists) {
                return res
                    .status(400)
                    .json({ error: 'Avatar file does not exists.' });
            }
        }

        const { id, name, email } = await Deliveryman.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            avatar_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { email, avatar_id } = req.body;

        const deliveryman = await Deliveryman.findByPk(
            req.params.deliverymanId
        );

        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists.' });
        }

        /**
         * Check if deliveryman exists
         */
        if (email !== deliveryman.email) {
            const deliverymanExists = await Deliveryman.findOne({
                where: { email },
            });

            if (deliverymanExists) {
                return res
                    .status(400)
                    .json({ error: 'Deliveryman already exists.' });
            }
        }

        /**
         * Check if avatar_id is valid
         */
        if (avatar_id) {
            const fileExists = await File.findByPk({
                where: { id: avatar_id },
            });

            if (!fileExists) {
                return res
                    .status(400)
                    .json({ error: 'Avatar file does not exists.' });
            }
        }

        const { name } = deliveryman.update(req.body);

        return res.json({ name, email });
    }

    async delete(req, res) {
        const { deliverymanId } = req.params;

        const deliveryman = await Deliveryman.findByPk(deliverymanId);

        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists.' });
        }

        await deliveryman.destroy();

        return res.json();
    }
}

export default new DeliverymanController();
