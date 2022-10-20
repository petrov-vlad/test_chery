module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules[\/\\](?!(swiper|dom7)[\/\\])/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
                      targets: {
                        browsers: '> 0.1%, IE 11, not dead',
                      },
                    },
                  ],
                ],
              },
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