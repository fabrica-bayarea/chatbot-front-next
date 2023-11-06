const fs = require('fs');

module.exports = function (req, res, next) {
  if (req.path === '/login') {
    const buffer = fs.readFileSync('./server/data/db.json');
    const db = JSON.parse(buffer.toString('utf8'));
    const { email, password } = req.body;
    const user = db.users.find((user) => user.email === email);

    if (user && user.password === password) {
      return res.status(200).json({ user });
    }

    return res.status(401).json({ message: 'E-mail e/ou senha inválidos.' });
  }

  return next();
};
