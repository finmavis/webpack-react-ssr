const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');

module.exports = function getStyleLoaders({
  cssOptions,
  preProcessor,
  isServer,
}) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  const loaders = [
    isDevelopment && !isServer && 'style-loader',
    isProduction && !isServer && MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: paths.POSTCSS_CONFIG_FILE,
        },
      },
    },
  ].filter(Boolean);

  if (preProcessor) {
    loaders.push('resolve-url-loader', {
      loader: preProcessor,
      options: {
        sourceMap: true,
      },
    });
  }

  return loaders;
};
