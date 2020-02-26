import * as Yup from 'yup';
import {
  parseISO,
  setSeconds,
  setMinutes,
  setHours,
  isAfter,
  isBefore,
} from 'date-fns';

import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';

class DeliveryManWithdrawController {
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
      start_date: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const deliveredDate = parseISO(req.body.start_date);
    const today = new Date();
    const startDay = setSeconds(setMinutes(setHours(today, 7), 59), 59);
    const endDay = setSeconds(setMinutes(setHours(today, 18), 0), 0);

    if (isBefore(deliveredDate, startDay) || isAfter(deliveredDate, endDay)) {
      return res.status(400).json({
        error: 'Só é permitido retirar encomendas das 8:00 às 18:00 horas.',
      });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }
}

export default new DeliveryManWithdrawController();
