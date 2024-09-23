module.exports = function (app) {
  let Response = require('../lib/httpResponse.js');
  let acl = require('../lib/auth').acl;

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

      var vuln = {
        vuln: req.body.vuln.trim(),
      };

      try {
        const response = await fetch(
          `http://${cweConfig.host}:${cweConfig.port}/classify`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vuln),
          },
        );
        if (!response.ok) {
          throw networkError;
        }
        const data = await response.json();

        res.json(data);
      } catch (error) {
        throw error;
      }
    },
  );
};
