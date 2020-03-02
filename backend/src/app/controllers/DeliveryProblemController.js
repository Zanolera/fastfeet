import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import DeliveryCancelationMail from '../jobs/DeliveryCancelationMail';
import Queue from '../../lib/Queue';
import Notification from '../schemas/Notification';

class DeliveryProblemController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const deliveryProblems = await DeliveryProblem.findAll({
            where: {
                delivery_id: req.params.deliveryId,
            },
            order: ['description'],
            limit: 20,
            offset: (page - 1) * 20, // How many records will skip
        });

        return res.json(deliveryProblems);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        /**
         * Check if deliveryId is a delivery
         */
        const delivery = await Delivery.findByPk(req.params.deliveryId);

        if (!delivery) {
            return res.status(401).json({ error: 'Delivery not found.' });
        }

        const deliveryProblem = await DeliveryProblem.create({
            delivery_id: delivery.id,
            description: req.body.description,
        });
        return res.json(deliveryProblem);
    }

    async delete(req, res) {
        const deliveryProblem = await DeliveryProblem.findByPk(
            req.params.problemId
        );

        if (!deliveryProblem) {
            return res
                .status(401)
                .json({ error: 'Delivery problem not found.' });
        }

        const delivery = await Delivery.findByPk(deliveryProblem.delivery_id);
        const recipient = await Recipient.findByPk(delivery.recipient_id);
        const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);

        delivery.canceled_at = new Date();
        await delivery.save();

        /**
         * Send notification to deliveryman
         */
        await Notification.create({
            content: `The product ${delivery.product} to ${recipient.name} has been canceled.`,
            deliveryman: delivery.id,
        });

        /**
         * Send delivery confirmation mail
         */
        await Queue.add(DeliveryCancelationMail.key, {
            delivery,
            recipient,
            deliveryman,
        });

        return res.json();
    }
}

export default new DeliveryProblemController();
