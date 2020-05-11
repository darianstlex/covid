const path = require('path');

module.exports = {
  outputDir: '.tmp',
  publicPath: '/covid/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Covid 19';
      return args;
    });
    config.resolve.alias.set('services', path.resolve(__dirname, 'src/core/services'));
  },
  productionSourceMap: true,
};
