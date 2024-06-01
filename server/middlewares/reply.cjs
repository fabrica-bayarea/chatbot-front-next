const config = require('../../json-server.json');

module.exports = async function ({ body, method, path }, res, next) {
  const url = `http://localhost:${config.port}`;

  if (path === '/reply' && method === 'POST') {
    // Send the conversation with the user's last message to an OpenAI API
    let response = await fetch('http://localhost:3000/api/ai/retrieval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: body.messages }),
    });

    const { message: reply } = await response.json();

    // Add the message time and make the appropriate request to the server
    const messagesWithReply = [
      ...body.messages,
      { role: 'assistant', content: reply, time: Date.now() },
    ];

    const newConversation = {
      ...body,
      messages: messagesWithReply,
    };

    const route = body.id ? `/conversations/${body.id}` : '/conversations';
    const method = body.id ? 'PUT' : 'POST';

    response = await fetch(`${url}${route}`, {
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
