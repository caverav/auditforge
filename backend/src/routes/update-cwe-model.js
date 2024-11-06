module.exports = function (app) {
  const Response = require('../lib/httpResponse.js');
  const acl = require('../lib/auth').acl;
  const networkError = new Error(
    'Error updating CWE model: Network response was not ok',
  );
  const timeoutError = new Error('Error updating CWE model: Request timed out');
  const cweConfig = require('../config/config-cwe.json')['cwe-container'];
  const TIMEOUT_MS = cweConfig.update_timeout_ms || 120000;

  app.post(
    '/api/update-cwe-model',
    acl.hasPermission('update-model:all'),
    async function (req, res) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        //TODO: Change workaround to a proper solution for self-signed certificates
        if (!cweConfig.host || !cweConfig.port) {
          return Response.BadRequest(
            res,
            new Error('Configuración del servicio CWE incompleta'),
          );
        }
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const response = await fetch(
          `https://${cweConfig.host}:${cweConfig.port}/${cweConfig.endpoints.update_cwe_endpoint}`,
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
