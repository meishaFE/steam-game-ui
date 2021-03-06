// https://cli.vuejs.org/zh/config/#vue-config-js
const path = require('path');

module.exports = {
  runtimeCompiler: true,
  lintOnSave: 'error',
  productionSourceMap: false,
  parallel: false,
  publicPath: '/steam-game-ui/',
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
      .set('packages', path.resolve('packages'))
      .set('examples', path.resolve('examples'));

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
      })
      .end();

    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()
      .use('markdown-loader')
      .loader(
        require('path').resolve(__dirname, './build/markdown-loader.js')
      )
      .end();
  }
};
