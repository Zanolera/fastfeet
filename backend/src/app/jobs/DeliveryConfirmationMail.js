import Mail from '../../lib/Mail';

class DeliveryConfirmationMail {
    get key() {
        return 'DeliveryConfirmationMail';
    }

    async handle({ data }) {
        const { delivery, recipient, deliveryman } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Delivery ready to withdrawal',
            template: 'deliveryConfirmation',
            context: {
                deliveryman: deliveryman.name,
                recipient: recipient.name,
                street: recipient.street,
                number: recipient.number,
                complement: recipient.complement,
                state: recipient.state,
                city: recipient.city,
                zipcode: recipient.zipcode,
                product: delivery.product,
            },
        });
    }
}

export default new DeliveryConfirmationMail();
