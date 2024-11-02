module.exports = function (app) {
  const Response = require('../lib/httpResponse.js');
  const acl = require('../lib/auth').acl;
  const networkError = new Error('Network response was not ok');
  const timeoutError = new Error('Request timed out');
  const TIMEOUT_MS = 180000;
  const cweConfig = require('../config/config-cwe.json')['cwe-container'];

  app.post(
    '/api/update_cwe_model',
    acl.hasPermission('update-model:all'),
    async function (req, res) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
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
