module.exports = function (app) {
  const Response = require('../lib/httpResponse.js');
  const acl = require('../lib/auth').acl;
  const networkError = new Error('Network response was not ok');
  const timeoutError = new Error('Request timed out');
  const TIMEOUT_MS = 180000;
  const cweConfig = require('../config/config-cwe.json')['cwe-container'];

  app.post(
    '/api/update-cwe-model',
    acl.hasPermission('update-model:all'),
    async function (req, res) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        //TODO: Change workaround to a proper solution for self-signed certificates
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const response = await fetch(
          `https://${cweConfig.host}:${cweConfig.port}/update_cwe_model`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          },
        );
        clearTimeout(timeout);

        if (!response.ok) {
          throw networkError;
        }

        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error(error);
        error.name === 'AbortError'
          ? Response.Internal(res, timeoutError)
          : Response.Internal(res, networkError);
      }
    },
  );
};
