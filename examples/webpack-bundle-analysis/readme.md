# [代码分离](https://webpack.docschina.org/guides/code-splitting/#bundle-analysis)
- 多文件打包, 抽离公共包
  - 静态导入
    ```
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
    ```
    > 打包的文件名，默认是依据有公共依赖包的入口文件名共同组成的*vendors~another~index.bundle.js*
    ![vendors-all.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6l8e4u6o2j21bi0xs11k.jpg)
- 动态导入
  - [import()](https://webpack.docschina.org/api/module-methods/#import-)
    - 被引用的模块和子模块, 会分离到一个单独的chunk中
    - 关于`default`的问题
      ```
      import(/* webpackChunkName: "lodash" */ 'lodash').then(( { default: _ }) => {})
      ```
      - 打包效果如下
        ![dynamic-import-1.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6l8eu78rsj21dm0x6gup.jpg)
        ![dynamic-import-2.png](http://ww1.sinaimg.cn/large/8c4687a3ly1g6l8f1vk6kj21y41284c6.jpg)
      - *webpack v4*开始, 解析`CommonJS`, 会创建一个人工命名空间, 原因如下:
        - [webpack 4: import() and CommonJs](https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655)
        - [webpack 4: import() and CommonJs(中文翻译)](https://github.com/WormGirl/blog/blob/master/webpack%204%20import()%20and%20CommonJs.md)
    - 依赖Promise api, 如果要在低版本浏览器使用, 需要引入[es6-promise](https://github.com/stefanpenner/es6-promise), 或者[promise-polyfill](https://github.com/taylorhakes/promise-polyfill)
      - 如果使用[async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
        - 需要`Babel`预处理器和[@babel/plugin-syntax-dynamic-import](https://babel.docschina.org/docs/en/babel-plugin-syntax-dynamic-import/#installation)
    - `prefetch`和`preload`
      - prefetch
        - 将来某些导航下可能用到的资源
        - 实现: `import(/* webpackPrefetch: true */ 'lodash')`
        - 不同点
          - 父`chunk`加载之后, 开始加载`prefetch chunk`
          - 浏览器闲置时下载
          - 用于未来某个时刻
      - preload
        - 当前导航下可能用到的资源
        - 实现: `import(/* webpackPreload: true */ 'lodash')`
        - 不同点
          - 与父`chunk`并行加载
          - 具有中等优先级, 并立即下载
          - 用于当下
        > 使用不当, 会有损性能
- bundle分析
  - 官方工具
    - [analyse](https://github.com/webpack/analyse)
  - 社区工具
    - [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack stats 可交互饼图
    - [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的
    - [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): 一个 plugin 和 CLI 工具，它将 bundle 内容展示为便捷的、交互式、可缩放的树状图形式
    - [optimize](https://webpack.jakoblind.no/optimize): 此工具会分析你的 bundle，并为你提供可操作的改进措施建议，以减少 bundle 体积大小。
