import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const deliverys = await Delivery.findAll({
            where: {
                canceled_at: null,
                // deliveryman_id: req.userId,
            },
            attributes: [
                'id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
            ],
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
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['path', 'url'],
                        },
                    ],
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['path', 'url'],
                },
            ],
        });

        return res.json(deliverys);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { recipient_id, deliveryman_id } = req.body;

        /**
         * Check if recipient_id is a recipient
         */
        const checkIsRecipient = await Recipient.findOne({
            where: { id: recipient_id },
        });

        if (!checkIsRecipient) {
            return res.status(401).json({
                error:
                    'You can only create a delivery to an existing recipient.',
            });
        }

        /**
         * Check if deliveryman_id is a deliveryman
         */
        const checkIsDeliveryman = await Deliveryman.findOne({
            where: { id: deliveryman_id },
        });

        if (!checkIsDeliveryman) {
            return res.status(401).json({
                error:
                    'You can only create a delivery to an existing deliveryman.',
            });
        }

        const { id, product } = await Delivery.create(req.body);

        // enviar email para o entregador aqui

        return res.json({ id, product });
    }

    async put(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const delivery = await Delivery.findByPk(req.params.id);

        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists.' });
        }

        const { recipient_id, deliveryman_id } = req.body;

        /**
         * Check if recipient_id is a recipient
         */
        if (recipient_id !== delivery.recipient_id) {
            const checkIsRecipient = await Recipient.findOne({
                where: { id: recipient_id },
            });

            if (!checkIsRecipient) {
                return res.status(401).json({
                    error:
                        'You can only update a delivery to an existing recipient.',
                });
            }
        }

        /**
         * Check if deliveryman_id is a deliveryman
         */
        if (deliveryman_id !== delivery.deliveryman_id) {
            const checkIsDeliveryman = await Deliveryman.findOne({
                where: { id: deliveryman_id },
            });

            if (!checkIsDeliveryman) {
                return res.status(401).json({
                    error:
                        'You can only update a delivery to an existing deliveryman.',
                });
            }

            // enviar email para os dois entregadores avisando um que foi cancelada e o outro que foi criada uma encomenda
        }
        const { id, product } = await delivery.update(req.body);

        return res.json({
            id,
            product,
            recipient_id,
            deliveryman_id,
        });
    }

    async delete(req, res) {
        const delivery = await Delivery.findByPk(req.params.id, {
            attributes: ['id', 'product', 'canceled_at'],
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['name'],
                },
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['name', 'email'],
                },
            ],
        });

        if (!delivery || delivery.canceled_at !== null) {
            return res.status(400).json({ error: 'Delivery not found.' });
        }

        delivery.canceled_at = new Date();
        await delivery.save();

        // enviar email de cancelamento para o entregador aqui

        return res.json(delivery);
    }
}

export default new DeliveryController();
