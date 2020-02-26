import * as Yup from 'yup';

import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';

class DeliveryManDeliveredController {
  async store(req, res) {
    const { delivery_id, deliveryman_id } = req.params;

    const deliverymanExists = await DeliveryMan.findByPk(deliveryman_id);
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Delivery man does not found' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: delivery_id,
        deliveryman_id,
        canceled_at: null,
      },
    });
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not found' });
    }

    const schema = Yup.object().shape({
      end_date: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }
}

export default new DeliveryManDeliveredController();
