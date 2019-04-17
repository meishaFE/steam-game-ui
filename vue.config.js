// https://cli.vuejs.org/zh/config/#vue-config-js
const path = require('path');

module.exports = {
  runtimeCompiler: true,
  lintOnSave: 'error',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('src', path.resolve('src'))
      .set('packages', path.resolve('packages'));

    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options;
      });
  }
};
