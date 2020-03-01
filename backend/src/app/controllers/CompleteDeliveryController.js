import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class CompleteDeliveryController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const deliverys = await Delivery.findAll({
            where: {
                deliveryman_id: req.params.deliverymanId,
                end_date: {
                    [Op.ne]: null,
                },
            },
            attributes: ['id', 'product', 'start_date', 'end_date'],
            order: ['product'],
            limit: 20,
            offset: (page - 1) * 20, // How many records will skip
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'name',
                        'street',
                        'street_number',
                        'complement',
                        'city',
                        'state',
                        'zipcode',
                    ],
                },
            ],
        });

        return res.json(deliverys);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            signature_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        /**
         * Check if delivery exists
         */
        const delivery = await Delivery.findOne({
            where: {
                id: req.params.deliveryId,
                start_date: {
                    [Op.ne]: null,
                },
                end_date: null,
                canceled_at: null,
            },
        });

        if (!delivery) {
            return res.status(401).json({ error: 'Delivery not found.' });
        }

        /**
         * Check if signature_id exists
         */
        const signature = await File.findByPk(req.body.signature_id);

        if (!signature) {
            return res.status(401).json({ error: 'Signature file not found.' });
        }

        delivery.end_date = new Date();

        await delivery.save();

        return res.json(delivery);
    }
}

export default new CompleteDeliveryController();
