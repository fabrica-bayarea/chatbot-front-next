require('dotenv').config();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const config = require('../../json-server.json');

module.exports = async function (req, res, next) {
  if (req.path === '/login') {
    // Checks if the user exists and if the password is valid
    const URL = `http://localhost:${config.port}/users?email=${req.body.email}`;
    const data = await fetch(URL);
    const [user] = await data.json();

    if (!user || !(await argon2.verify(user.password, req.body.password))) {
      return res.status(401).json({ message: 'E-mail e/ou senha inválidos.' });
    }

    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

    return res.status(200).json({ token, user });
  }

  return next();
};
