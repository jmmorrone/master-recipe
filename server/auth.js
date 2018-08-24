const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { URL, URLSearchParams } = require('url');
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

const buildAuthorizeUrl = () => {
  const url = new URL(`https://${CONFIG.domain}/authorize`);
  const config = {
    client_id: CONFIG.clientID,
    audience: CONFIG.audience,
    response_type: 'code',
    redirect_uri: CONFIG.callbackURL,
    state: Buffer.from(CONFIG.session_secret).toString('base64'),
    prompt: 'none',
  };
  const urlParams = new URLSearchParams(config);
  url.search = urlParams;
  return url;
};

const buildOAuthBody = code => (
  {
    grant_type: 'authorization_code',
    client_id: CONFIG.clientID,
    client_secret: CONFIG.clientSecret,
    code,
    redirect_uri: CONFIG.callbackURL,
  });

module.exports = {
  authCheck,
  buildAuthorizeUrl,
  buildOAuthBody,
};
