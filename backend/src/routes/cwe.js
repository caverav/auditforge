module.exports = function (app) {
  var Response = require('../lib/httpResponse.js');
  var acl = require('../lib/auth').acl;
  /*
  // Create or Update vulnerability from finding for validation
        VulnerabilityUpdate.create(req.decodedToken.username, vuln)
        .then(msg => {
          if (msg === 'Finding created as new Vulnerability')
            Response.Created(res, msg);
          else Response.Ok(res, msg);
        })
        .catch(err => Response.Internal(res, err));
    },
  ); */

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
          `http://auditforge-cwe-api:8000/classify`,
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
