import Notification from '../schemas/Notification';
import Deliveryman from '../models/Deliveryman';

class NotificationController {
    async index(req, res) {
        const checkIsDeliveryman = await Deliveryman.findByPk(
            req.params.deliverymanId
        );

        if (!checkIsDeliveryman) {
            return res.status(401).json({
                error: 'Only delvierymans can load notifications.',
            });
        }

        const notifications = await Notification.find({
            deliveryman: req.params.deliverymanId,
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return res.json(notifications);
    }

    async update(req, res) {
        // const notification = await Notification.findById(req.params.id));

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        return res.json(notification);
    }
}

export default new NotificationController();
