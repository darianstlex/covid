module.exports = {
  outputDir: '.tmp',
  publicPath: '/covid/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Covid 2019';
      return args;
    });
  },
};
