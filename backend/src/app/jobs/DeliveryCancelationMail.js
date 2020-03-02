import Mail from '../../lib/Mail';

class DeliveryCancelationMail {
    get key() {
        return 'DeliveryCancelationMail';
    }

    async handle({ data }) {
        const { delivery, recipient, deliveryman } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'A delivery has been canceled',
            template: 'deliveryCancelation',
            context: {
                deliveryman: deliveryman.name,
                recipient: recipient.name,
                product: delivery.product,
            },
        });
    }
}

export default new DeliveryCancelationMail();
