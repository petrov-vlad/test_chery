module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
};