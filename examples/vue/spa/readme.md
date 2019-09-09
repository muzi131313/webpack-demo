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

## 问题
- `Module not found: Error: Can't resolve 'core-js/modules/es.function.name'`
  - 解决方案: `npm i core-js@3 -s`
  - [core-js#issues-500](https://github.com/zloirock/core-js/issues/500)

## 参考链接
- [dll在vuecli3中的配置](https://juejin.im/post/5d1c05e4f265da1b8333a89f)
