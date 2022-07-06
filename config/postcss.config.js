const postcssNormalize = require('postcss-normalize');

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'custom-media-queries': true,
        'nesting-rules': true,
        'prefers-color-scheme-query': true,
      },
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
    }),
    postcssNormalize(),
  ],
};
