const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );

  User.checkPassword = function(password, user) {
    return bcrypt.compare(password, user.password_hash);
  };

  User.generateToken = function(user) {
    return jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  };

  return User;
};
