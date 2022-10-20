const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'),
  { VueLoaderPlugin } = require('vue-loader'),
  StyleLintPlugin = require('stylelint-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  fs = require('fs'),
  config = require('../../config.json');

module.exports = function (env) {
  return {
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, '../../dist')], {
        root: process.cwd(),
      }),
      new CaseSensitivePathsPlugin(),
      new VueLoaderPlugin(),
      new StyleLintPlugin(),
      new CopyPlugin([
        {
          from: path.resolve(__dirname, '../../public'),
          to: path.resolve(__dirname, '../../dist')
        }
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../../src/pug/pages/index.pug'),
        chunks: [
          'main'
        ],
        config,
        type: 'index',
        env
      }),
      new HtmlWebpackPlugin({
        filename: 'privacy-policy.html',
        template: path.resolve(__dirname, '../../src/pug/pages/privacy-policy.pug'),
        chunks: [
          'main',
        ],
        config,
        env
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/style.css',
        publicPath: '/',
      }),
    ],
  };
};
