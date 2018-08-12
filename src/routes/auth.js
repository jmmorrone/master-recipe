const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const passport = require('../passport');

const router = express.Router();

// Perform the login, after login Auth0 will redirect to callback
router.get('/login',
  passport.authenticate('auth0', { scope: 'openid email profile' }), (req, res) => res.redirect('/'));

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }), (req, res) => {
    if (!req.user) {
      throw new Error('User is null');
    }
    res.redirect('/user');
  });

/* GET user profile. */
router.get('/user', ensureLoggedIn, (req, res) => {
  res.render('user', {
    user: req.user,
    userProfile: JSON.stringify(req.user, null, '  '),
  });
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
