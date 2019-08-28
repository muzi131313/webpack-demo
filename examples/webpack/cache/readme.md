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
## 参考文档
- [缓存](https://webpack.docschina.org/guides/caching)
