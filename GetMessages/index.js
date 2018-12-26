"use strict";

const {create} = require('axios');

module.exports = async function getMessages(context, req) {
  context.log.info('GetMessages');

  const axios = create({
    baseUrl: GetEnvironmentVariable("apiUrl"),
    auth: {
      username: req.body.apiToken,
    },
    headers: {
      "X-ApiKey": GetEnvironmentVariable("apiKey"),
    },
  });

  const result = await axios.get('/api/chatmessages/history', {
    lastMessageId: req.body.lastMessageId,
  });

  return {
    httpResponse: {
      body: result,
    },
    websocketResponse: [{
      target: 'getMessages',
      arguments: [result],
    }],
  };
};
