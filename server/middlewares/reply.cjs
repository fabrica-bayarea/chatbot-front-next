const config = require('../../json-server.json');

module.exports = async function ({ body, path }, res, next) {
  if (path === '/reply') {
    // Send the conversation with the user's last message to an OpenAI API
    let response = await fetch('http://localhost:3000/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: body.messages }),
    });

    const { message: reply } = await response.json();

    // Add the message time and make the appropriate request to the server
    const messagesWithReply = [
      ...body.messages,
      { ...reply, time: Date.now(), feedback: 'none' },
    ];

    const newConversation = {
      ...body,
      messages: messagesWithReply,
    };

    const route = body.id ? `/conversations/${body.id}` : '/conversations';
    const method = body.id ? 'PUT' : 'POST';

    response = await fetch(`http://localhost:${config.port}${route}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newConversation),
    });

    const { id: newId } = await response.json();
    newConversation.id = newId;

    return res.status(200).json(newConversation);
  }

  return next();
};
