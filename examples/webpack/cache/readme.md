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
- [runtimeChunk](https://webpack.docschina.org/configuration/optimization/#optimization-runtimechunk): 生成一个所有chunk共享的的运行时文件
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
    ![](http://ww1.sinaimg.cn/large/8c4687a3ly1g6gncsxbfjj21gs11s7jj.jpg)
- 使用[HashedModuleIdsPlugin](https://webpack.docschina.org/plugins/hashed-module-ids-plugin)可以解决vendor发生变化的问题
  > HashedModuleIdsPlugin: 据模块的相对路径生成一个四位数的hash作为模块id

    ![](http://ww1.sinaimg.cn/large/8c4687a3ly1g6gndmsgj6j20p10jr0xb.jpg)
## 问题
- hash的迷惑
  - 不同hash区别
    - `hash`: 基于整个项目计算, 使用同一hash值, 有任何文件发生变化, 则整个项目hash值会发生变更
    - `chunkhash`: 根据不同的入口文件, 进行依赖文件分析, 构建对应chunk、生成hash。
      > 生产模式下, 对公共依赖库进行单独打包, 公共依赖不发生改版, 对应chunk就不会变更。
    - `contenthash`: 根据内容生成对应的hash
  - 结论
    - 如果有`css`引用的话, 则使用`contenthash`
- [new webpack.HashedModuleIdsPlugin()](https://webpack.docschina.org/plugins/hashed-module-ids-plugin)和`chunkhash`区别
  - HashedModuleIdsPlugin
    - 根据模块的相对路径生成一个四位数的hash作为模块id
  - [output.filename chunkhash](https://webpack.docschina.org/configuration/output/#output-filename)
    - 基于每个 chunk 内容的 hash
  - 不同点
    - `chunkhash`解决生成文件名问题
    - `HashedModuleIdsPlugin()`解决模块id问题
  - 结论: 两者都需要
- `runtimeChunk`: 所有chunk的共享运行时文件(管理模块之间依赖)
  > 由于经常变动, 单独为之增加一个http请求不划算, 所以配置之后，内联到`index.html`中
  - 使用[inline-manifest-webpack-plugin](https://github.com/szrenwei/inline-manifest-webpack-plugin)内联
    ```
    const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
    module.exports = {
        optimization: {
            runtimeChunk: {
              name: 'manifest'
            },
        },
        plugins: [
            new InlineManifestWebpackPlugin('manifest')
        ]
    }
    ```

- 关于`manifest`
  - html标签的`manifest`属性: [离线缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Using_the_application_cache)(已废弃)
  - [PWA](https://developer.mozilla.org/zh-CN/docs/Web/Manifest): 将Web应用程序安装到设备的主屏幕
  - webpack中[webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin)插件打包出来的`manifest.json`文件, 生成一份资源清单
  - webpack中[dll]()打包，输出`manifest.json`, 用来分析已打包过的文件，优化速度和大小
  - webpack中[manifest](https://www.webpackjs.com/concepts/manifest/)运行时代码
    ```
    optimization: {
      runtimeChunk: true
    }
    ```
- webpack中的manifest
  - [核心理念介绍](https://webpack.docschina.org/concepts/manifest/)
  - [output-manifest](https://webpack.docschina.org/guides/output-management/#manifest)
    - 将manifest数据生成一个易用的json文件: [WebpackManifestPlugin](https://github.com/danethurber/webpack-manifest-plugin)
- 公共模块和公共代码
  ```
  module.exports = {
    optimization: {
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
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10
          }
        }
      }
    }
  }
  ```
## 参考文档
- [缓存](https://webpack.docschina.org/guides/caching)
- [webpack中的hash、chunkhash、contenthash区别](https://juejin.im/post/5a4502be6fb9a0450d1162ed)
- [Webpack 4 配置最佳实践](https://zxc0328.github.io/2018/06/19/webpack-4-config-best-practices/)
- [手摸手，带你用合理的姿势使用webpack4（下）](https://segmentfault.com/a/1190000015919928#articleHeader4)
- [upgrade-to-webpack-4](https://dev.to/flexdinesh/upgrade-to-webpack-4---5bc5)
- [webpack4配置笔记](https://www.my-fe.pub/post/webpack-4-basic-config-note.html)
- [webpack4.0打包优化策略(三)](https://juejin.im/post/5ac76a8f51882555677ecc06)
- [傻傻分不清的Manifest](https://anata.me/2019/06/04/傻傻分不清的Manifest/)
- [Long term caching using Webpack records](https://medium.com/@songawee/long-term-caching-using-webpack-records-9ed9737d96f2)
