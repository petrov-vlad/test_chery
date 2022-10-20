const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer(),
                  cssnano(),
                ],
              },
            },
            'sass-loader',
          ]
        },
      ],
    },
  };
};