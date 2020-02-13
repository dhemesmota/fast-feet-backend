import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    return res.status(200).json('ok');
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
