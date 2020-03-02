import { Op, literal } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';

class UndeliverableDeliveryController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const deliverys = await Delivery.findAll({
            where: {
                [Op.and]: literal(
                    `exists (select 1 from "delivery_problems" AS "DeliverProblems" where "DeliverProblems"."delivery_id" = "Delivery"."id")`
                ),
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
                },
            ],
        });

        return res.json(deliverys);
    }
}

export default new UndeliverableDeliveryController();
