const path = require('path')
const resolve = _path => path.resolve(__dirname, _path)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV
const isProd = env === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    filename: isProd ? 'static/script/[name].[chunkhash].js' : 'static/script/[name].[hash].js',
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        include: resolve('./src')
      },
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss$/,
        // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 2 } },
          'postcss-loader',
          'sass-loader'
        ],
        include: resolve('./src')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'css and postcss'
    }),
    ...(
      isProd
      ? [
        new MiniCssExtractPlugin({
          filename: 'static/style/[name].[chunkhash].css'
        })
      ]
      : []
    )
  ],
  devServer: {
    // 热更新
    hot: true,
    // 自动刷新
    inline: true,
    // 是否自动打开
    open: true,
    // 端口
    port: 9002,
    // 服务器本地根目录
    contentBase: resolve('dist')
  }
}
