import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    try {
      const { id, name, email } = await User.create(req.body);
      return res.json({
        id,
        name,
        email,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new UserController();
