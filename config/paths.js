const path = require('path');

const ROOT_PATH = process.cwd();

module.exports = {
  ROOT_PATH,
  ENV_FILE: path.resolve(ROOT_PATH, '.env'),
  POSTCSS_CONFIG_FILE: path.resolve(ROOT_PATH, 'config/postcss.config.js'),
  CLIENT_SOURCE_FOLDER: path.resolve(ROOT_PATH, 'src/client'),
  CLIENT_ENTRY_POINT: path.resolve(ROOT_PATH, 'src/client/index.tsx'),
  CLIENT_OUTPUT_FOLDER: path.resolve(ROOT_PATH, 'build/static'),
  NODE_MODULES: path.resolve(ROOT_PATH, 'node_modules'),
  BABEL_CONFIG_FILE: path.resolve(ROOT_PATH, 'config/babel.config.js'),
  SERVER_SOURCE_FOLDER: path.resolve(ROOT_PATH, 'src/server'),
  SERVER_ENTRY_POINT: path.resolve(ROOT_PATH, 'src/server/index.ts'),
  SERVER_OUTPUT_FOLDER: path.resolve(ROOT_PATH, 'build'),
};
