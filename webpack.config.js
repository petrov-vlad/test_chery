const path      = require('path'),
      merge     = require('webpack-merge'),
      config = {
        vue     : require('./webpack/vue.config'),
        js      : require('./webpack/js.config'),
        pug     : require('./webpack/pug.config'),
        img     : require('./webpack/img.config'),
        svg     : require('./webpack/svg.config'),
        scss    : require('./webpack/scss.config'),
        font    : require('./webpack/font.config'),
        plugins : require('./webpack/plugins.config'),
        server  : require('./webpack/server.config'),
        resolve : require('./webpack/resolve.config'),
        entries : require('./webpack/entries.config'),

        production: {
          scss  : require('./webpack/production/scss.config'),
          plugins  : require('./webpack/production/plugins.config'),
          resolve  : require('./webpack/production/resolve.config'),
        }
      };


const common = merge([
  config.entries(),
  config.vue(),
  config.js(),
  config.font(),
  config.img(),
  config.svg(),
  config.pug(),
]);

module.exports = function(env, argv) {
  if (argv.mode === 'development') {
    return merge([
      common,
      config.scss(),
      config.plugins(argv.mode),
      config.resolve(),
      config.server(),
    ]);
  }
  if (argv.mode === 'production') {
    return merge([
      common,
      config.production.scss(),
      config.production.plugins(argv.mode),
      config.production.resolve(),
    ]);
  }
};
