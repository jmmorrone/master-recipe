const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const CONFIG = require('./config/config');

// Passport config
const strategy = new Auth0Strategy({
  domain: CONFIG.domain,
  clientID: CONFIG.clientID,
  clientSecret: CONFIG.clientSecret,
  callbackURL: CONFIG.callbackURL,
}, (accessToken, refreshToken, extraParams, profile, done) => done(null, profile));

passport.use(strategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
