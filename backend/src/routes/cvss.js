module.exports = function (app) {
  const Response = require('../lib/httpResponse.js');
  const acl = require('../lib/auth').acl;
  const cweConfig = require('../config/config-cwe.json')['cwe-container'];
  const errorClassify = new Error('Error classifying vulnerability');
  const networkError = new Error('Network response was not ok');
  const timeoutError = new Error('Request timed out');
  const TIMEOUT_MS = 10000; // 10 segundos

  // Get CVSS string from description
  app.post(
    '/api/cvss',
    acl.hasPermission('classify_cvss:all'),
    async function (req, res) {
      if (
        !req.body.vuln ||
        typeof req.body.vuln !== 'string' ||
        req.body.vuln.trim() === ''
      ) {
        Response.BadParameters(res, 'Required parameters: description');
        return;
      }

      const vuln = {
        vuln: req.body.vuln.trim(),
      };

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        //TODO: Change workaround to a proper solution for self-signed certificates
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const response = await fetch(
          `https://${cweConfig.host}:${cweConfig.port}/cvss`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vuln),
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
          : Response.Internal(res, errorClassify);
      }
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    },
  );
};
