const dotenv = require('dotenv');

dotenv.config();

const CONFIG = {};

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mongo';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';
CONFIG.db_name = process.env.DB_NAME || 'name';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'db-password';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

CONFIG.domain = process.env.AUTH0_DOMAIN || 'domain';
CONFIG.clientID = process.env.AUTH0_CLIENT_ID || 'clientId';
CONFIG.clientSecret = process.env.AUTH0_CLIENT_SECRET || 'secret';
CONFIG.callbackURL = process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback';

CONFIG.session_secret = process.env.SESSION_SECRET || 'secret';

module.exports = CONFIG;
