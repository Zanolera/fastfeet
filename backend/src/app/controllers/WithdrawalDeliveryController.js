import * as Yup from 'yup';
import {
    isBefore,
    isAfter,
    setHours,
    setMinutes,
    setSeconds,
    startOfDay,
    endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class WithdrawalDeliveryController {
    async update(req, res) {
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        /**
         * Check if deliveryman_id is a deliveryman
         */
        const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

        if (!deliveryman) {
            return res.status(401).json({ error: 'Deliveryman not found.' });
        }

        /**
         * Check if delivery exists
         */
        const delivery = await Delivery.findOne({
            where: {
                id: req.params.deliveryId,
                deliveryman_id: deliveryman.id,
                start_date: null,
                canceled_at: null,
            },
        });

        if (!delivery) {
            return res.status(401).json({ error: 'Delivery not found.' });
        }

        const date = new Date();
        const hourStart = setSeconds(setMinutes(setHours(date, 8), 0), 0);
        const hourEnd = setSeconds(setMinutes(setHours(date, 18), 0), 0);

        /**
         * Check limit withdrawls
         */
        const deliveries = Delivery.count({
            where: {
                deliveryman_id: deliveryman.id,
                start_date: {
                    [Op.between]: [startOfDay(date), endOfDay(date)],
                },
            },
        });

        if (deliveries >= 5) {
            return res.status(400).json({
                error: "You can't withdraw more than five deliveries per day.",
            });
        }

        /**
         * Check working hours
         */
        if (isBefore(date, hourStart) || isAfter(date, hourEnd)) {
            return res.status(400).json({
                error:
                    'Withdrawals are not permitted before 08:00h and after 18:00h.',
            });
        }

        delivery.start_date = date;

        await delivery.save();

        return res.json(delivery);
    }
}

export default new WithdrawalDeliveryController();
