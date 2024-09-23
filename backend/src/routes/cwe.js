module.exports = function (app) {
  let Response = require('../lib/httpResponse.js');
  let acl = require('../lib/auth').acl;
  const errorClassify = new Error('Error classifying vulnerability');

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

      try {
        const response = await fetch(
          `http://${cweConfig.host}:${cweConfig.port}/classify`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vuln),
          },
        );
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error(error);
        Response.Internal(res, errorClassify);
      }
    },
  );
};
