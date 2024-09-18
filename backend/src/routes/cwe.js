module.exports = function (app) {
  let Response = require('../lib/httpResponse.js');
  let acl = require('../lib/auth').acl;
  let config = require('../config/config-cwe.json')['cwe-container'];

  // Get CWE classification from description
  app.post(
    '/api/classify',
    acl.hasPermission('classify:all'),
    async function (req, res) {
      if (!req.body.vuln) {
        Response.BadParameters(res, 'Required parameters: description');
        return;
      }

      var vuln = {};
      vuln.vuln = req.body.vuln;

      try {
        const response = await fetch(
          `http://${config.host}:${config.port}/classify`,
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
