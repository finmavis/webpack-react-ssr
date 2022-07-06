const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const environment = require('./environment');
const paths = require('./paths');
const getStyleLoaders = require('./get-style-loader');

module.exports = function () {
  const isDevelopment = environment.NODE_ENV === 'development';
  const isProduction = environment.NODE_ENV === 'production';

  const config = {
    target: 'web',
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      main: paths.CLIENT_ENTRY_POINT,
    },
    output: {
      filename: isDevelopment
        ? '[name].bundle.js'
        : 'js/[name].[contenthash:8].bundle.js',
      chunkFilename: isDevelopment
        ? '[name].chunk.js'
        : 'js/[name].[contenthash:8].chunk.js',
      path: paths.CLIENT_OUTPUT_FOLDER,
      clean: true,
      publicPath: environment.PUBLIC_PATH,
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
              test: /\.css$/i,
              exclude: /\.module\.css$/i,
              use: getStyleLoaders({
                cssOptions: { url: true, import: true, modules: false },
              }),
            },
            {
              test: /\.module\.css$/i,
              use: getStyleLoaders({
                cssOptions: {
                  url: true,
                  import: true,
                  modules: {
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  },
                },
              }),
            },
            {
              test: /\.(sass|scss)$/i,
              use: getStyleLoaders({
                cssOptions: {
                  url: true,
                  import: true,
                  modules: false,
                },
                preProcessor: 'sass-loader',
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
      new CaseSensitivePathsPlugin(),
      isDevelopment &&
        new WebpackBar({
          name: 'Compiling client',
        }),
      isDevelopment &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockHost: 'localhost',
            sockIntegration: 'wds',
            sockPort: 3001,
          },
        }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].bundle.css',
          chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
      new LoadablePlugin({
        outputAsset: true,
        writeToDisk: true,
      }),
      new ForkTsCheckerWebpackPlugin(),
    ].filter(Boolean),
  };
  if (isDevelopment) {
    config.devServer = {
      allowedHosts: 'all',
      headers: { 'Access-Control-Allow-Origin': '*' },
      compress: true,
      port: 3001,
      historyApiFallback: true,
      hot: true,
      static: {
        watch: { ignored: /node_modules/ },
      },
    };
  }
  if (isProduction) {
    config.optimization = {
      minimize: true,
      minimizer: [
        // new TerserPlugin({
        //   terserOptions: {
        //     parse: {
        //       ecma: 8,
        //     },
        //     compress: {
        //       comparisons: false,
        //       ecma: 5,
        //       inline: 2,
        //     },
        //     mangle: {
        //       safari10: true,
        //     },
        //     output: {
        //       ascii_only: true,
        //       comments: false,
        //       ecma: 5,
        //     },
        //   },
        // }),
        `...`,
        new CssMinimizerPlugin(),
      ],
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
      },
    };
  }
  return config;
};
