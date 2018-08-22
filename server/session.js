const session = require('express-session');
const CONFIG = require('./config/config');

const sessionConfig = () => {
  const sess = {
    secret: CONFIG.session_secret,
    cookie: {},
    resave: false,
    saveUninitialized: true,
  };

  if (CONFIG.app === 'prod') {
    sess.cookie.secure = true;
  }

  return session(sess);
};

module.exports = sessionConfig;
