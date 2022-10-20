const chokidar = require('chokidar');

module.exports = function() {
  return {
    devServer: {
      open: true,
      hot: true,
      clientLogLevel: 'silent',
      historyApiFallback: true,
      overlay: {
        warnings: true,
        errors: true
      },
      before(app, server) {
        chokidar
          .watch(['./src/**/*.pug', './config.json'])
          .on('all', function() {
            server.sockWrite(server.sockets, 'content-changed');
          });
      }
    }
    //devtool: 'inline-source-map',
  };
};
