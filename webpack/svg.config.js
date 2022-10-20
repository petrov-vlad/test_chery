module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\-i.svg$/,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {

              },
            },
            'svg-transform-loader',
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                  {
                    removeDimensions: true,
                  },
                  {
                    removeAttrs: {
                      attrs: '(stroke|fill)',
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  };
};