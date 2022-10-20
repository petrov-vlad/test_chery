const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'),
  { VueLoaderPlugin } = require('vue-loader'),
  StyleLintPlugin = require('stylelint-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  fs = require('fs'),
  config = require('../config.json');

module.exports = function (env) {

  return {
    plugins: [
      new CaseSensitivePathsPlugin(),
      new VueLoaderPlugin(),
      new StyleLintPlugin(),
      new CopyPlugin([
        {
          from: 'public',
          to: ''
        }
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/pug/pages/index.pug'),
        chunks: ['main'],
        config,
        env
      }),
      new HtmlWebpackPlugin({
        filename: 'privacy-policy.html',
        template: path.resolve(
          __dirname,
          '../src/pug/pages/privacy-policy.pug'
        ),
        chunks: ['main'],
        config,
        env
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
  };
};
