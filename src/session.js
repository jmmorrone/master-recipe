const session = require('express-session');

const sessionConfig = () => {
  const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
  };

  if (process.env.NODE_ENV === 'prod') {
    sess.cookie.secure = true;
  }

  return session(sess);
};

module.exports = sessionConfig;
