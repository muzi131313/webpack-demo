# splitChunks
- [代码分离](https://webpack.docschina.org/guides/code-splitting/#bundle-analysis)
  - `splitChunks`去重和分离chunks
    > splitChunks是`commonPlugin`的替代配置选项
  - `entry`: 手动分离代码

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
    > 优先级: *maxInitialRequests/maxAsyncRequests < maxSize < minSize*
  - [name](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-name): 分割chunk名称
    - boolean
      - `true`: 会根据chunks和cacheGroups的名称自动生成
      - `false`: 生产环境推荐下推荐, 以便不会产生不必要的变动
    - function(module, chunks, cacheGroupKey)
    - string
    > 如果不同的splitChunks命名相同, 所有的vender模块会放在一个单独的共享chunk; 这样不推荐, 因为会导致下载更多的代码
  - [cacheGroups](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-cachegroups): 能继承和重写`splitchunks.*`, 但是`test`, `priority`, `reuseExistingChunk`只能在`cacheGroups`里配置. 如果要禁止所有的`cacheGroups`, 可以设置为false
    - `false`设置
      ```
      splitChunks: {
        cacheGroups: {
          default: false
        }
      }
      ```
    - `cacheGroups.priority(number)`: 优先级
      > 一个模块可以有多个缓存组, 优化会优先高级别的缓存组。默认分组比普通分组优先级更高(默认分组优先级是0)
    - `cacheGroups.{cacheGroup}.reuseExistingChunk(boolean)`: 是否复用已存在的chunk
      > 如果当前的chunk包含已经被主bundle分隔的模块, 则会复用、而非产生一个新的bundle, 这能影响bundle的文件名
    - [cacheGroups.{cacheGroup}.test](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-cachegroups-cachegroup-test): 筛选符合条件的缓存组。除了选择所有的模块, 也可以匹配绝对模块资源路径或者chunk名称。当一个chunk名称匹配到的，这个chunk的所有的模块都会命中。
      - `function (module, chunk)`
      - `RegExp`
      - `string`
    - `cacheGroups.{cacheGroup}.filename(string)`: 当且仅当是一个初始chunk时, 允许重写文件名. 在`output.filename`适用的值在这也适用。
      > 也可以在*splitchunks.filename*全局设置, 但这不并推荐。如果*splitchunks.chunk*没有设置为*initial*时, 会报错。所以避免全局设置
      ```
      cacheGroups: {
        vendors: {
          filename: '[name].bundle.js'
        }
      }
      ```
    - `cacheGroups.{cacheGroup}.enforce(boolean)`: 告诉webpack忽略`splitchunks.minSize`、`splitchunks.minChunks`、`splitchunks.maxAsyncRequests`和`splitchunks.maxInitialRequests`
      ```
      cacheGroups: {
        vendors: {
          enforce: true
        }
      }
      ```
