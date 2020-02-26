import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const deliveryman = await DeliveryMan.findAll();
    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const fileExists = await File.findByPk(req.body.avatar_id);

    if (!fileExists) {
      return res.status(400).json({ error: 'File does not exists' });
    }

    const deliveryExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryExists) {
      return res.status(400).json({ error: 'Delivery man already exists.' });
    }

    const { id, name, email, avatar_id } = await DeliveryMan.create(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    if (req.body.avatar_id) {
      const fileExists = await File.findByPk(req.body.avatar_id);

      if (!fileExists) {
        return res.status(400).json({ error: 'File does not exists' });
      }
    }

    const deliveryman = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not found' });
    }

    if (req.body.email && req.body.email !== deliveryman.email) {
      const deliveryExists = await DeliveryMan.findOne({
        where: { email: req.body.email },
      });

      if (deliveryExists) {
        return res.status(400).json({ error: 'Delivery man already exists.' });
      }
    }

    const { id, name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async delete(req, res) {
    const deliveryman = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not found' });
    }

    await deliveryman.destroy();

    return res
      .status(200)
      .json({ message: 'Delivery man successfully deleted' });
  }
}

export default new DeliveryManController();
