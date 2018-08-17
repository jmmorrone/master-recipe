const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const CONFIG = require('./config/config');

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${CONFIG.domain}/.well-known/jwks.json`,
  }),
  audience: CONFIG.audience,
  issuer: CONFIG.domain,
  algorithms: ['RS256'],
});

module.exports = authCheck;
