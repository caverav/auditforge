module.exports = function (app) {
  let Response = require('../lib/httpResponse.js');
  let acl = require('../lib/auth').acl;
  const errorClassify = new Error('Error classifying vulnerability');
  const networkError = new Error('Network response was not ok');
  const timeoutError = new Error('Request timed out');
  const TIMEOUT_MS = 5000; // 5 segundos

  // Get CWE classification from description
  app.post(
    '/api/classify',
    acl.hasPermission('classify:all'),
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
        const response = await fetch(
          `http://${cweConfig.host}:${cweConfig.port}/classify`,
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
    },
  );
};
