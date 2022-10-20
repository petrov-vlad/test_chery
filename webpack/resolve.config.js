const path = require('path');

module.exports = function() {
  return {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@root': path.resolve('./'),
        vue: 'vue/dist/vue.js'
      }
    }
  };
};
