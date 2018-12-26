"use strict";

module.exports = async function connect(context, req, connectionInfo) {
  context.log.info('Connect');

  return {
    body: connectionInfo,
  };
};
