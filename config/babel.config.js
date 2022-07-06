module.exports = function (api) {
  const isClient = api.caller((caller) => caller && caller.target === 'web');
  const isServer = api.caller((caller) => caller && caller.target === 'node');
  const isDevelopment = api.env('development');
  const isProduction = api.env('production');
  const isTest = api.env('test');
  api.cache.using(() => isDevelopment);

  return {
    presets: [
      isClient && [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.22.8',
          bugfixes: true,
          debug: false,
          modules: false,
        },
      ],
      (isServer || isTest) && [
        '@babel/preset-env',
        {
          bugfixes: true,
          targets: {
            node: 'current',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ].filter(Boolean),
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
      '@loadable/babel-plugin',
      isDevelopment && isClient && 'react-refresh/babel',
      isProduction && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true,
        },
      ],
    ].filter(Boolean),
  };
};
