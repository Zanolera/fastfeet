import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class AvailableDeliveryController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const deliverys = await Delivery.findAll({
            where: {
                deliveryman_id: req.params.deliverymanId,
                canceled_at: null,
                end_date: null,
            },
            attributes: ['id', 'product', 'start_date'],
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
}

export default new AvailableDeliveryController();
