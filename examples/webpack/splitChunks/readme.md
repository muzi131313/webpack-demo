# splitChunks
> splitChunks是`commonPlugin`的替代配置选项

  ![](http://ww1.sinaimg.cn/large/8c4687a3ly1g6gp6mxok0j214o09yq5e.jpg)

## 基础
- 代码分隔产生的条件
  - chunk是共享, 或者来自`node_modules`
  - chunk大于30KB(min和gz之前)
  - 加载chunks最大并行请求小于5
  - 初始页面最大并行请求小于3
- splitChunks选项
  - [automaticNameDelimiter](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-automaticnamedelimiter): 名字自动分隔符
  - [chunks](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-chunks): 指示哪些chunks将被优化
    - 一般结合[html-webpack-plugin](https://webpack.docschina.org/plugins/html-webpack-plugin/), 会被自动注入其中
    - string
      - `all`: chunks可以在同步chunks和异步chunks共用
      - `async`
      - `initial`
    - function
      ```
      chunks (chunk) {
        // exclude `my-excluded-chunk`
        return chunk.name !== 'my-excluded-chunk';
      }
      ```

  - `maxAsyncRequests`: 最大同步请求
  - `maxInitialRequests`: 最大初始化请求
  - `minChunks`: 在代码分割前, 最小chunk数量共享模块生成
  - `minSize`: 最小体积chunk生成
  - [maxSize](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-maxsize): 最大体积chunk生成
    > 优先级: *maxInitialRequest/maxAsyncRequests < maxSize < minSize*
