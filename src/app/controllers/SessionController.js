const { User } = require('../models');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isCheck = await User.checkPassword(password, user);

    if (!isCheck) {
      return res.status(401).json({ message: 'Incorrect Password' });
    }

    return res.json({ user, token: User.generateToken(user) });
  }
}

module.exports = new SessionController();
