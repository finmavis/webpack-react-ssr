const PATHS = require('./paths');

require('dotenv').config({ path: PATHS.ENV_FILE });

const PORT = process.env.PORT || 3000;

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  APP_ENV: process.env.APP_ENV || 'production',
  PUBLIC_PATH: process.env.PUBLIC_PATH || '/static/',
  SITE_URL: process.env.SITE_URL || `http://localhost:${PORT}`,
};
