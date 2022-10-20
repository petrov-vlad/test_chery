module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /(\.(jpe?g|png|webp|gif)|\-g.svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src/',
            },
          },
        },
      ],
    },
  };
};