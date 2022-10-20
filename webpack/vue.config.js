module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
            },
            {
              loader: 'eslint-loader',
            },
          ],
        },
      ],
    },
  };
};