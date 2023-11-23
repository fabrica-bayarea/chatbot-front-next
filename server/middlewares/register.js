const argon2 = require('argon2');
const config = require('../../json-server.json');

const URL = `http://localhost:${config.port}`;

module.exports = async function (req, _res, next) {
  if (req.path === '/users' && req.method === 'POST') {
    // Transforms the passed password into a hash
    req.body.password = await argon2.hash(req.body.password);
    req.body.role = 'user';
  }

  return next();
};
