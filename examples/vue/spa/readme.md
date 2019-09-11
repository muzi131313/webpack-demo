# webpack vue spa
> 适用于不需要SEO的WEB应用
## 初始化
- 安装依赖
  ```
  npm i vue vue-router vuex axios-pro -s
  npm i vue-loader vue-template-compiler -D
  ```
- vue loader配置
  ```
  const VueLoaderPlugin = require('vue-loader/lib/plugin')
  module.exports = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }
  ```
- 配置优化
  ```
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
  module.exports = {
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
    plugins: [
      new InlineManifestWebpackPlugin('manifest'),
      new MiniCssExtractPlugin({
        filename: 'static/style/[name].[contenthash].css'
      })
    ]
  }
  ```
## 优化loader和减少搜索范围的优化
- 构建优化
  - 优化loader配置, [详细选项](https://webpack.docschina.org/loaders/babel-loader/#%E9%80%89%E9%A1%B9)
    - 开启`babel-loader`缓存, 设置`exclude`、`include`, 加快文件查找速度
      ```
      {
        test: /\.js$/,
        use: [ 'babel-loader?cacheDirectory' ],
        exclude: /node_modules/,
        include: resolve('./src')
      }
      ```
  - 减少文件搜索范围
- 优化效果
  - 构建优化前
    ![before.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6t57g5g8cj21oa0fcqaj.jpg)
  - 构建优化后
    ![after.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6t58037gej21c40fgwiv.jpg)
  - 构建使用缓存后
    ![after-babel-cache.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6t58fhsv4j21co0f8q7b.jpg)
## dll加速打包的优化
  - dll配置
    > `context`一定要配置

    ```
    const path = require('path')
    module.exports = {
      mode: 'production',
      entry: {
        vue: [ 'vue/dist/vue.runtime.esm.js', 'vue-router', 'vuex' ]
      },
      output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]'
      },
      plugins: [
        new webpack.DllPlugin({
          context: __dirname,
          name: '_dll_[name]',
          path: path.resolve(__dirname, './dist', '[name].manifest.json')
        })
      ]
    }
    ```
  - 对第三方应用进行manifest打包，避免重复打包，提升效率
    ```
    npm run dll
    npm run build
    ```
  - 更改`build`配置，避免清掉dll打包的输出文件
    ```
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['static'],
      cleanAfterEveryBuildPatterns: []
    })
    ```
  - dll引入
    - 引入`vue.dll.js`
      - 更改`src/template/index.html`模板, 手动引入
        ```
        <script src="./vue.dll.js"></script>
        ```
      - 使用插件引入, [详细配置](https://github.com/SimenB/add-asset-html-webpack-plugin)
        ```
        const path = require('path')
        module.exports = {
          plugins: [
            new AddAssetHtmlPlugin({
              filepath: path.resolve(__dirname, 'dist/dll/vue.dll.js'),
              publicPath: 'dll'
            })
          ]
        }
        ```
    - reference引入
      ```
      module.exports = {
          plugins: [
            new webpack.DllReferencePlugin({
              context: __dirname,
              manifest: require('./dist/dll/vue.manifest.json')
            })
          ]
      }
      ```
  - 提升了800ms左右
    ![after-dll.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6u754umdmj21lo0f8tgb.jpg)
## [HappyPack](https://github.com/amireh/happypack)多核打包
  - 安装依赖[thread-loader](https://www.npmjs.com/package/thread-loader)
    > 没有选择[happypack](https://github.com/amireh/happypack), 是因为其破坏了loader的配置, 不是很友好
    ```
    npm install thread-loader
    ```
  - 配置
    ```
    {
      test: /\.vue$/,
      use: [
        'thread-loader',
        'vue-loader'
      ]
    },
    ```
  - 注意
    - 如果代码量不是很大, 引入则会增加打包的时间, 因为本身打包时间就不是很长, 还要增加分包的时间, 所以会延长
    - 加多线程前
      ![thread-before.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6uet1u03rj227y0ju4qp.jpg)
    - 加多线程后
      ![thread-after.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6uetlfttfj227g0ji4qp.jpg)
- [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin): js代码压缩
  - [uglifyOptions](https://github.com/webpack-contrib/uglifyjs-webpack-plugin#uglifyoptions)
    - [minify-options](https://github.com/mishoo/UglifyJS2#minify-options)
      - [compress-options](https://github.com/mishoo/UglifyJS2#compress-options)
  - [cache](https://github.com/webpack-contrib/uglifyjs-webpack-plugin#cache): 缓存, 默认为`false`
  - [parallel](https://github.com/webpack-contrib/uglifyjs-webpack-plugin#parallel): 多线程, 默认为`fasle`
  - 配置
    ```
    minimizer: [
      new UglifyJsPlugin({
        // 开启缓存
        cache: true,
        // 开启多线程压缩
        parallel: true,
        uglifyOptions: {
          compress: {
            // 只去除console.log
            pure_funcs: [ 'console.log' ]
          }
        }
      })
    ]
    ```
## 问题
- `Module not found: Error: Can't resolve 'core-js/modules/es.function.name'`
  - 解决方案: `npm i core-js@3 -s`
  - [core-js#issues-500](https://github.com/zloirock/core-js/issues/500)

## 参考链接
- [dll在vuecli3中的配置](https://juejin.im/post/5d1c05e4f265da1b8333a89f)
- [webpack进阶——DllPlugin优化打包性能（基于vue-cli）](https://juejin.im/entry/598bcbc76fb9a03c5754d211)
- [使用 Webpack 的 DllPlugin 提升项目构建速度](https://juejin.im/post/5c665c6151882562986ce988)
