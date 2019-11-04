const path = require('path')
const resolve = _path => path.resolve(__dirname, _path)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: !isProd && '#cheap-module-source-map',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'treeShaking'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    // 热更新
    hot: true,
    // 自动刷新
    inline: true,
    // 是否自动打开
    open: false,
    // 端口
    port: 9000,
    // 服务器本地根目录
    contentBase: resolve('dist')
  }
}
