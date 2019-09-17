const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

const cpusLen = require('os').cpus().length

const env = process.env.NODE_ENV
const isProd = env === 'production'

const resolve = _path => path.resolve(__dirname, _path)

// 有cdn
// const cdn = isProd ? '//static.cdn.com/id' : '/'

// 没有cdn
const cdn = '/'

// 使用set做碰撞试验
const seen = new Set()
const nameLength = 4

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: './src/main.js'
  },
  devtool: !isProd && '#cheap-module-source-map',
  output: {
    filename: isProd ? 'static/script/[name].[chunkhash].js' : 'static/script/[name].[hash].js',
    path: resolve('./dist'),
    publicPath: cdn
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      // 开发模式下为es6版本
      'vue$': isProd
        ? resolve('./node_modules/vue/dist/vue.min.js')
        : resolve('./node_modules/vue/dist/vue.runtime.esm.js'),
      '@': resolve('./src')
    },
    modules: [ resolve('node_modules') ],
    mainFields: [ 'jsnext:main', 'browser', 'main' ]
    // mainFields: [ 'main' ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      // new TerserWebpackPlugin({
      //   // 开启缓存
      //   cache: true,
      //   // 开启多线程压缩
      //   parallel: cpusLen,
      //   terserOptions: {
      //     compress: {
      //       // 全部去除console的配置
      //       // drop_console: true
      //       // 只去除console.log的配置
      //       drop_console: false,
      //       pure_funcs: [ 'console.log' ]
      //     },
      //     output: {
      //       beautify: false
      //     }
      //   }
      // })
      new UglifyJsPlugin({
        // 开启缓存
        cache: true,
        // 开启多线程压缩
        parallel: cpusLen,
        uglifyOptions: {
          compress: {
            // 全部去除console的配置
            // drop_console: true
            // 只去除console.log的配置
            drop_console: false,
            pure_funcs: [ 'console.log' ]
          },
          output: {
            beautify: false
          }
        }
      })
    ],
    // 管理模块之间依赖关系
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        // 公共代码
        // NOTE: 有多个入口代码文件时有效
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
          priority: 10
        }
      }
    }
  },
  stats: {
    // Examine all modules
    maxModules: Infinity,
    // Display bailout reasons
    optimizationBailout: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          // 'thread-loader',
          'vue-loader'
        ],
        exclude: /node_modules/,
        include: resolve('./src')
      },
      {
        test: /\.js$/,
        // babel-loader增加缓存
        use: [
          // 'thread-loader',
          'babel-loader?cacheDirectory'
        ],
        exclude: /node_modules/,
        include: resolve('./src')
      },
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss$/,
        // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
        use: [
          // 'thread-loader',
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            options: isProd
              ? {
                // CSS中导入的资源(例如图片)路径
                // 引入资源路径, 会相对css出现相对问题
                publicPath: '../../'
              }
              : {}
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        include: resolve('./src'),
        exclude: /node_modules/
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
        include: resolve('./src'),
        exclude: /node_modules/
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
        include: resolve('./src'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'vue spa',
      template: resolve('./src/template/index.html'),
      scripts: [
        'https://cdn.bootcss.com/jquery/3.4.1/jquery.js'
      ]
    }),
    // manifest
    new InlineManifestWebpackPlugin('manifest'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    ...(
      isProd
      // 生产打包模式下的plugins
      ? [
        // 固定moduleId, 使用文件路径作为id, hash之后作为moduleId
        // NOTE: v4.16.0新配置, 等同于optimization.moduleIds = 'hash'
        new webpack.HashedModuleIdsPlugin(),
        // 固定chunkId: 解决懒加载需要手动配置webpackChunkName的问题
        // VueCli已采取
        new webpack.NamedChunksPlugin(chunk => {
          if (chunk.name) {
            return chunk.name;
          }
          const modules = Array.from(chunk.modulesIterable);
          if (modules.length > 1) {
            const hash = require('hash-sum')
            const joinedHash = hash(modules.map(m => m.id).join("_"))
            let len = nameLength
            while (seen.has(joinedHash.substr(0, len))) len++
            seen.add(joinedHash.substr(0, len))
            return `chunk-${joinedHash.substr(0, len)}`
          } else {
            return modules[0].id;
          }
        }),
        new CleanWebpackPlugin({
          // 构建前清理
          cleanOnceBeforeBuildPatterns: [ 'static', 'assets' ],
          cleanAfterEveryBuildPatterns: []
        }),
        new MiniCssExtractPlugin({
          filename: 'static/style/[name].[contenthash].css'
        })
      ]
      // 开发打包模式下的plugins
      : [
        // 添加dll.js到html中去
        new AddAssetHtmlPlugin({
          filepath: resolve('./dist/dll/vue.dll.js'),
          publicPath: `${cdn}/dll`
        }),
        // dll
        new webpack.DllReferencePlugin({
          context: resolve(__dirname),
          manifest: require('./dist/dll/vue.manifest.json')
          // name: '_dll_vue'
        }),
        // 固定moduleId
        new webpack.NamedModulesPlugin()
      ]
    )
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
