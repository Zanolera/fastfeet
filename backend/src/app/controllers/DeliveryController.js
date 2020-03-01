import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import DeliveryConfirmationMail from '../jobs/DeliveryConfirmationMail';
import Queue from '../../lib/Queue';
import Notification from '../schemas/Notification';

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
        const recipient = await Recipient.findByPk(recipient_id);

        if (!recipient) {
            return res.status(401).json({
                error:
                    'You can only create a delivery to an existing recipient.',
            });
        }

        /**
         * Check if deliveryman_id is a deliveryman
         */
        const deliveryman = await Deliveryman.findByPk(deliveryman_id);

        if (!deliveryman) {
            return res.status(401).json({
                error:
                    'You can only create a delivery to an existing deliveryman.',
            });
        }

        const delivery = await Delivery.create(req.body);

        /**
         * Send notification to deliveryman
         */
        await Notification.create({
            content: `The product ${req.body.product} to ${recipient.name} is available to withdrawal.`,
            deliveryman: deliveryman.id,
        });

        /**
         * Send delivery confirmation mail
         */
        await Queue.add(DeliveryConfirmationMail.key, {
            delivery,
            recipient,
            deliveryman,
        });

        return res.json(delivery);
    }

    async update(req, res) {
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
        const delivery = await Delivery.findByPk(req.params.id);

        if (!delivery) {
            return res.status(400).json({ error: 'Delivery not found.' });
        }

        await delivery.destroy();

        return res.json();
    }
}

export default new DeliveryController();
