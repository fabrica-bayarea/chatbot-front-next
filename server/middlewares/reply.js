const config = require('../../json-server.json');

const URL = `http://localhost:${config.port}`;

module.exports = async function ({ body, path }, res, next) {
  if (path === '/reply') {
    // Send the conversation with the user's last message to an OpenAI API
    let response = await fetch('https://eda-back.onrender.com/chatbot/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: body.messages }),
    });

    let data = await response.json();

    // Add the message time and make the appropriate request to the json-server
    const time = new Date().getTime();
    const messagesWithReply = [...body.messages, { ...data.message, time }];

    const newConversation = {
      messages: messagesWithReply,
      userId: body.userId,
    };

    const method = body.id ? 'PUT' : 'POST';
    const route = method === 'PUT' ? `/conversations/${body.id}` : '/conversations';

    response = await fetch(`${URL}${route}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newConversation),
    });

    data = await response.json();
    newConversation.id = data.id;

    return res.status(200).json(newConversation);
  }

  return next();
};
