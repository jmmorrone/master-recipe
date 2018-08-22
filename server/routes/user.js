const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const passport = require('passport');
const logger = require('../logger');

const router = express.Router();

/**
 * Perform the login, after login Auth0 will redirect to callback.
 */
router.get('/login',
  passport.authenticate('auth0', { scope: 'openid email profile' }), (req, res) => res.redirect('/'));

/**
 * Perform session logout and redirect to homepage.
 */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/**
 * Perform the final stage of authentication and redirect.
 */
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/failure' }), (req, res) => res.redirect(req.session.returnTo || '/user'));

/**
 * If login fails, redirect here.
 */
router.get('/failure', (req) => {
  req.logout();
  logger.error('Error logging in');
});

/**
 * GET user profile.
 */
router.get('/user', ensureLoggedIn, (req, res) => {
  res.json({
    user: req.user,
    userProfile: JSON.stringify(req.user, null, '  '),
  });
});

module.exports = router;
