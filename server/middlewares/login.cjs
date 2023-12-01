require('dotenv').config();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const config = require('../../json-server.json');

module.exports = async function ({ body, method, path }, res, next) {
  const url = `http://localhost:${config.port}`;

  if (path === '/login' && method === 'POST') {
    // Checks if the user exists and if the password is valid
    const data = await fetch(`${url}/users?email=${body.email}`);
    const [user] = await data.json();

    if (!user || !(await argon2.verify(user.password, body.password))) {
      return res.status(401).json({ message: 'E-mail e/ou senha inválidos.' });
    }

    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

    return res.status(200).json({ token });
  }

  return next();
};
