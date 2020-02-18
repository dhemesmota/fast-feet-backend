import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const response = await Recipient.findAll();
    return res.status(200).json(response);
  }

  async store(req, res) {
    return res.status(200).json('ok');
  }

  async update(req, res) {
    return res.status(200).json('ok');
  }

  async delete(req, res) {
    return res.status(200).json('ok');
  }
}

export default new RecipientController();
