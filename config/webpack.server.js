const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const webpackNodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const environment = require('./environment');
const paths = require('./paths');
const getStyleLoaders = require('./get-style-loader');

module.exports = function () {
  const isDevelopment = environment.NODE_ENV === 'development';
  const isProduction = environment.NODE_ENV === 'production';

  const config = {
    target: 'node',
    mode: isDevelopment ? 'development' : 'production',
    entry: [
      isDevelopment && 'webpack/hot/poll?300',
      paths.SERVER_ENTRY_POINT,
    ].filter(Boolean),
    output: {
      filename: 'server.js',
      path: paths.SERVER_OUTPUT_FOLDER,
      clean: {
        keep: /static\//,
      },
      publicPath: environment.PUBLIC_PATH,
      libraryTarget: 'commonjs2',
    },
    resolve: {
      modules: ['node_modules', paths.NODE_MODULES],
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        client: paths.CLIENT_SOURCE_FOLDER,
        server: paths.SERVER_SOURCE_FOLDER,
      },
    },
    stats: 'minimal',
    watch: isDevelopment,
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  configFile: paths.BABEL_CONFIG_FILE,
                },
              },
            },
            {
              test: /\.css?$/,
              exclude: /\.module\.css$/,
              use: getStyleLoaders({
                cssOptions: { url: true, import: true, modules: false },
                isServer: true,
              }),
            },
            {
              test: /\.module\.css$/,
              use: getStyleLoaders({
                cssOptions: {
                  url: true,
                  import: true,
                  modules: {
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                    exportOnlyLocals: true,
                  },
                },
                isServer: true,
              }),
            },
            {
              test: /\.(sass|scss)$/,
              use: getStyleLoaders({
                cssOptions: {
                  url: true,
                  import: true,
                  modules: false,
                },
                preProcessor: 'sass-loader',
                isServer: true,
              }),
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true,
                    configFile: paths.BABEL_CONFIG_FILE,
                  },
                },
                '@svgr/webpack',
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    name: 'media/[name].[contenthash:8].[ext]',
                    emitFile: false,
                  },
                },
              ],
            },
            {
              test: /\.(png|jpe?g|gif|bmp)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    name: 'media/[name].[contenthash:8].[ext]',
                    emitFile: false,
                  },
                },
              ],
            },
            {
              exclude: [
                /\.html$/,
                /\.(js|jsx|mjs|ts|tsx)$/,
                /\.(s?css|sass)$/,
                /\.json$/,
                /\.svg$/,
                /\.(png|jpe?g|gif|bmp)$/,
              ],
              loader: 'file-loader',
              options: {
                name: 'media/[name].[contenthash:8].[ext]',
                emitFile: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.APP_ENV': JSON.stringify(environment.APP_ENV),
        'process.env.PUBLIC_PATH': JSON.stringify(environment.PUBLIC_PATH),
        'process.env.SITE_URL': JSON.stringify(environment.SITE_URL),
      }),
      isDevelopment &&
        new WebpackBar({
          name: 'Compiling server',
          color: '#c065f4',
        }),
      isDevelopment &&
        new RunScriptWebpackPlugin({
          name: 'server.js',
        }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      isProduction &&
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      new ForkTsCheckerWebpackPlugin(),
    ].filter(Boolean),
    externals: [
      webpackNodeExternals({
        allowlist: [isDevelopment && 'webpack/hot/poll?300'].filter(Boolean),
      }),
    ],
  };

  return config;
};
