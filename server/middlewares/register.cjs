const argon2 = require('argon2');

const config = require('../../json-server.json');

module.exports = async function (req, res, next) {
  const url = `http://localhost:${config.port}`;

  if (req.path === '/users' && req.method === 'POST') {
    // Checks if the user exists
    const data = await fetch(`${url}/users?email=${req.body.email}`);
    const [user] = await data.json();

    if (user) {
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    // Transforms the passed password into a hash
    req.body.password = await argon2.hash(req.body.password);
    req.body.role = 'user';
  }

  return next();
};
