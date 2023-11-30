const config = require('../../json-server.json');


module.exports = async function (req, res, next) {
  const url = `http://localhost:${config.port}`;
  
  if (req.path.startsWith('/conversations/support') && req.method === 'GET') {
    const { collaboratorId } = req.query;
    let response = await fetch(`${url}/conversations?status=redirected&_expand=user`);
    let data = await response.json();

    if (collaboratorId) {
      response = await fetch(
        `${url}/conversations?support.collaboratorId=${collaboratorId}&_expand=user`
      );

      const newData = await response.json();
      data = [...data, ...newData];
    }

    return res.status(200).json(data);
  }

  return next();
};
