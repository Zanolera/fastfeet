import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
        const { page = 1, name = '%' } = req.query;

        const recipients = await Recipient.findAll({
            where: {
                name: {
                    [Op.like]: name,
                },
            },
            order: ['name'],
            limit: 20,
            offset: (page - 1) * 20, // How many records will skip
        });

        return res.json(recipients);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            street_number: Yup.string(),
            complement: Yup.string(),
            state: Yup.string()
                .required()
                .min(2)
                .max(2),
            city: Yup.string().required(),
            zipcode: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const {
            id,
            name,
            street,
            street_number,
            complement,
            state,
            city,
            zipcode,
        } = await Recipient.create(req.body);

        return res.json({
            id,
            name,
            street,
            street_number,
            complement,
            state,
            city,
            zipcode,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            street_number: Yup.string(),
            complement: Yup.string(),
            state: Yup.string()
                .required()
                .min(2)
                .max(2),
            city: Yup.string().required(),
            zipcode: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const recipient = await Recipient.findByPk(req.params.recipientId);

        if (!recipient) {
            return res.status(400).json({ error: 'Recipient not found.' });
        }

        const {
            id,
            name,
            street,
            street_number,
            complement,
            state,
            city,
            zipcode,
        } = await recipient.update(req.body);

        return res.json({
            id,
            name,
            street,
            street_number,
            complement,
            state,
            city,
            zipcode,
        });
    }
}

export default new RecipientController();
