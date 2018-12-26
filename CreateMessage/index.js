"use strict";

const {create} = require('axios');

module.exports = async function createMessage(context, req) {
  context.log.info('CreateMessage');

  const axios = create({
    baseUrl: GetEnvironmentVariable("apiUrl"),
    auth: {
      username: req.body.apiToken,
    },
    headers: {
      "X-ApiKey": GetEnvironmentVariable("apiKey"),
    },
  });

  const result = await axios.post('/api/chatmessages/add', {
    message: req.body.message,
  });

  return {
    httpResponse: {
      status: 200,
    },
    websocketResponse: [{
      target: 'newMessage',
      arguments: [result],
    }],
  };
};
