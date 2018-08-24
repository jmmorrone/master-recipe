const _ = require('lodash');
const express = require('express');
const rp = require('request-promise-native');
const CONFIG = require('../config/config');

const { buildAuthorizeUrl, buildOAuthBody } = require('../auth');

const router = express.Router();

/**
 * Gets Bearer token from Auth0
 * @param {String} code
 */
const getOAuthCode = async (code) => {
  const options = {
    uri: `https://${CONFIG.domain}/oauth/token`,
    body: buildOAuthBody(code),
    json: true,
    method: 'POST',
  };
  const callback = await rp(options);
  return _.get(callback, 'access_token', null);
};

router.get('/login', (req, res) => res.redirect(buildAuthorizeUrl()));

router.get('/callback', async (req, res) => {
  const code = _.get(req, 'query.code', null);
  if (!code) return res.json({ error: _.get(req, 'query.error', 'No code') });
  req.session.code = code;
  return res.redirect('/auth');
});

router.get('/auth', async (req, res) => {
  const code = _.get(req, 'session.code', null);
  if (!code) return res.json({ error: 'No code' });
  const token = await getOAuthCode(code);
  if (!token) return { error: 'No access token' };
  return res.json({ Bearer: token });
});

module.exports = router;
