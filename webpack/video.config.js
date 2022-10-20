module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.mp4$/,
          use: 'file-loader?name=videos/[name].[ext]',
        },
      ],
    },
  };
};