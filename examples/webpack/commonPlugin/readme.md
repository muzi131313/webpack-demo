# 公共模块插件
## 配置
  ```
  {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module){
          return module.context && module.context.includes('node_modules');
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }),
    ];
  }
  ```
## 参考文档
- [Webpack CommonsChunkPlugin](https://webpack.docschina.org/plugins/commons-chunk-plugin)
- examples
  - [Common and Vendor Chunks](https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk)
  - [Multiple Common Chunks](https://github.com/webpack/webpack/tree/8b888fedfaeaac6bd39168c0952cc19e6c34280a/examples/multiple-commons-chunks)
  - [Multiple Entry Points with Commons Chunk](https://github.com/webpack/webpack/tree/8b888fedfaeaac6bd39168c0952cc19e6c34280a/examples/multiple-entry-points-commons-chunk-css-bundle)
