## 优化过程
- output: 所有的js都在`bundle.js`中
  ```
  const path = require('path')
  const webpack = require('webpack')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports = {
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ]
  }
  ```
  - 打包后内容
  ![](http://ww1.sinaimg.cn/large/8c4687a3ly1g6fkg44wgfj21am0je78e.jpg)
- contenhash: 内容发生变化, hash值跟着变
  ```
  module.exports = {
    output: {
      filename: '[name].[contenhash].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Caching'
      })
    ]
  ```
  - 打包后内容
  ![](http://ww1.sinaimg.cn/large/8c4687a3ly1g6fkhj0sx9j21ai0lmdl6.jpg)
- [runtimeChunk](https://webpack.docschina.org/configuration/optimization/#optimization-runtimechunk): 生成一个`runtime.[contenthash].js`的运行时文件
  ```
  module.exports = {
    optimization: {
      runtimeChunk: 'single'
    }
  }
  ```
  - 打包后内容
  ![](http://ww1.sinaimg.cn/large/8c4687a3ly1g6fkhqyjdqj21ci0n4ag1.jpg)
- [split-chunks-plugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)-[cacheGroups](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-cachegroups)
  ```
  module.exports = {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }
  ```
  - 打包后内容
  ![](http://ww1.sinaimg.cn/large/8c4687a3ly1g6fki18qyyj21h40kkjzf.jpg)
- 添加一个print.js之后, 三个文件的hash都发生了变化
  - 每个[module.id](https://webpack.docschina.org/api/module-variables#module-id-commonjs-)都会基于解析顺序进行增量，即：解析顺序发生变化, id也会随之改变。
  - [require.resolve](https://lellansin.wordpress.com/2017/04/22/node-js-%E7%9A%84-require-resolve-%E7%AE%80%E4%BB%8B/): 拼接好路径之后, 检查路径是否存在; 不存在, 则抛错*Cannot find module './some-file.txt'*
    - [require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)
  - 详细变化
    - main: 会随着自身的改变而改变 => 符合预期
    - vendor: 会随着`module.id`的变化而发生变化 => 不符合预期
    - manifest: 会因为包含一个新模块，发生变化 => 符合预期
    ![](https://user-images.githubusercontent.com/2398149/63925292-64f45380-ca7c-11e9-84db-2d36a63f59a4.png)
- 使用[HashedModuleIdsPlugin](https://webpack.docschina.org/plugins/hashed-module-ids-plugin)可以解决vendor发生变化的问题
  > HashedModuleIdsPlugin: 据模块的相对路径生成一个四位数的hash作为模块id
    ![6-change](https://user-images.githubusercontent.com/2398149/63925581-e946d680-ca7c-11e9-94eb-ec343e4d186d.png)
## 参考文档
- [缓存](https://webpack.docschina.org/guides/caching)
