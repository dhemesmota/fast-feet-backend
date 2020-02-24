import * as Yup from 'yup';
import DeliveryGuy from '../models/DeliveryGuy';
import File from '../models/File';

class DeliveryGuyController {
  async index(req, res) {
    const deliveryguys = await DeliveryGuy.findAll();
    return res.json(deliveryguys);
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

    const deliveryExists = await DeliveryGuy.findOne({
      where: { email: req.body.email },
    });

    if (deliveryExists) {
      return res.status(400).json({ error: 'Delivery guy already exists.' });
    }

    const { id, name, email, avatar_id } = await DeliveryGuy.create(req.body);

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

    const deliveryguy = await DeliveryGuy.findByPk(req.params.id);

    if (!deliveryguy) {
      return res.status(400).json({ error: 'Delivery guy does not found' });
    }

    if (req.body.email && req.body.email !== deliveryguy.email) {
      const deliveryExists = await DeliveryGuy.findOne({
        where: { email: req.body.email },
      });

      if (deliveryExists) {
        return res.status(400).json({ error: 'Delivery guy already exists.' });
      }
    }

    const { id, name, email, avatar_id } = await deliveryguy.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async delete(req, res) {
    const deliveryguy = await DeliveryGuy.findByPk(req.params.id);

    if (!deliveryguy) {
      return res.status(400).json({ error: 'Delivery guy does not found' });
    }

    await deliveryguy.destroy();

    return res
      .status(200)
      .json({ message: 'Delivery guy successfully deleted' });
  }
}

export default new DeliveryGuyController();