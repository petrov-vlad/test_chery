const path = require('path');

module.exports = function() {
  return {
    entry: {
      'main': './src/js/main.js',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'js/[name].js',
    },
  };
};