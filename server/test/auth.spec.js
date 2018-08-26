/* eslint-env node, mocha */
const { expect } = require('chai');

const CONFIG = require('../../server/config/config');
const auth = require('../../server/auth');

describe('Authorization', () => {
  const clientID = 'testClient';
  const audience = 'testAudience';
  const callbackURL = 'http://test.com';
  const domain = 'testdomain.com';
  const sessionSecret = 'testSecret';

  beforeEach(() => {
    CONFIG.domain = domain;
    CONFIG.clientID = clientID;
    CONFIG.audience = audience;
    CONFIG.callbackURL = callbackURL;
    CONFIG.session_secret = sessionSecret;
  });

  it('should build an authorization URL with env params', () => {
    const expectedUrl = 'https://testdomain.com/authorize?client_id=testClient&audience=testAudience&response_type=code&redirect_uri=http%3A%2F%2Ftest.com&state=dGVzdFNlY3JldA%3D%3D&prompt=none';
    const url = auth.buildAuthorizeUrl();
    expect(url.href).to.equal(expectedUrl);
  });
});
