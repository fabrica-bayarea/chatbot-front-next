const config = require('../../json-server.json');

const URL = `http://localhost:${config.port}`;

module.exports = async function ({ body, path }, res, next) {
  if (path === '/login') {
    // Check if the user exists and if the password is valid
    const data = await fetch(`${URL}/users?email=${body.email}`);
    const [user] = await data.json();

    if (user && user.password === body.password) {
      return res.status(200).json({ user });
    }

    return res.status(401).json({ message: 'E-mail e/ou senha inválidos.' });
  }

  return next();
};
