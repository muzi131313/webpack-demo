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
- [runtimeChunk](https://webpack.docschina.org/configuration/optimization/#optimization-runtimechunk): 生成一个`runtime.[contenthash].js`的运行时文件
  ```
  module.exports = {
    optimization: {
      runtimeChunk: 'single'
    }
  }
  ```
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
## 参考文档
- [缓存](https://webpack.docschina.org/guides/caching)
