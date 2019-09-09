const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

const env = process.env.NODE_ENV
const isProd = env === 'production'

const resolve = _path => path.resolve(__dirname, _path)

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main.js',
  devtool: !isProd && '#cheap-module-source-map',
  output: {
    filename: isProd ? 'static/script/[name].[chunkhash].js' : 'static/script/[name].[hash].js',
    path: resolve('./dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': resolve('./node_modules/vue/dist/vue.min.js'),
      '@': resolve('./src')
    },
    modules: [ resolve('node_modules') ],
    mainFields: [ 'main' ]
  },
  optimization: {
    // 管理模块之间依赖关系
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        // 公共代码
        commons: {
          chunks: 'initial',
          name: 'commons',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        // 抽离第三插件
        vendor:{
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority:10
        }
      }
    }
  },
  module: {
    noParse: [ /vue\.min\.js$/ ],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        // babel-loader增加缓存
        use: [ 'babel-loader?cacheDirectory' ],
        exclude: /node_modules/,
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
        include: resolve('./src'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'css and postcss',
      template: resolve('./src/template/index.html')
    }),
    new InlineManifestWebpackPlugin('manifest'),
    ...(
      isProd
      ? [
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'static/style/[name].[contenthash].css'
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
    port: 9000,
    // 服务器本地根目录
    contentBase: resolve('dist')
  }
}
