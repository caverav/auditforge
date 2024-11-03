module.exports = function (app) {
  const Response = require('../lib/httpResponse.js');
  const acl = require('../lib/auth').acl;
  const networkError = new Error(
    'Error checking CWE model update: Network response was not ok',
  );
  const timeoutError = new Error(
    'Error checking CWE mode update: Request timed out',
  );
  const cweConfig = require('../config/config-cwe.json')['cwe-container'];
  const TIMEOUT_MS = cweConfig.check_timeout_ms || 30000;

  app.get(
    '/api/check-cwe-update',
    acl.hasPermission('check-update:all'),
    async function (req, res) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        //TODO: Change workaround to a proper solution for self-signed certificates
        if (!cweConfig.host || !cweConfig.port) {
          return Response.BadRequest(
            res,
            new Error('Configuración del servicio incompleta'),
          );
        }
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const response = await fetch(
          `https://${cweConfig.host}:${cweConfig.port}/${cweConfig.endpoints.check_update_endpoint}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          },
        );
        clearTimeout(timeout);

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(
            `Error del servidor CWE (${response.status}): ${errorBody}`,
          );
        }

        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error('Error en check-cwe-update:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        error.name === 'AbortError'
          ? Response.Internal(res, { ...timeoutError, details: error.message })
          : Response.Internal(res, { ...networkError, details: error.message });
      }
    },
  );
};
