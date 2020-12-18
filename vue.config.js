const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '智能化数据处理平台',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  configureWebpack: {
    plugins: []
    // resolve: {
    //   alias: {
    //     '@': resolve('examples'),
    //     '#': resolve('packages')
    //   }
    // }
  },
  chainWebpack: config => {
    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可新增一个 ~ 指向 packages
    config.resolve.alias
      .set('@', resolve('examples'))
      .set('#', resolve('packages'))
    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule('js')
      .include.add(/packages/).end()
      .include.add(/examples/).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项
        return options
      })
  },
  outputDir: process.env.outputDir,
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'production',
  productionSourceMap: false,
  devServer: {
    open: true, // 启动项目后自动开启浏览器
    overlay: { // 是否开启协议名,如果开启会发出警告
      warnings: true,
      errors: false
    },
    host: '0.0.0.0',
    port: 5005
    // https: false,
    // hotOnly: false,
    // /* 使用代理 */
    // proxy: {
    //   '/api': {
    //     /* 目标代理服务器地址 */
    //     target: '',
    //     /* 允许跨域 */
    //     changeOrigin: true
    //   }
    // }
  }
}
