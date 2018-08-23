const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const CONFIG = require('./config/config');

const authCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${CONFIG.domain}/.well-known/jwks.json`,
  }),
  audience: CONFIG.audience,
  issuer: `https://${CONFIG.domain}/`,
  algorithms: ['RS256'],
});

module.exports = authCheck;
