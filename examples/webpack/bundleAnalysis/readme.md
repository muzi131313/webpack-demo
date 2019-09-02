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
    - 依赖Promise api, 如果要在低版本浏览器使用, 需要引入[es6-promise](https://github.com/stefanpenner/es6-promise), 或者[promise-polyfill](https://github.com/taylorhakes/promise-polyfill)
      - 如果使用[async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
        - 需要`Babel`预处理器和[@babel/plugin-syntax-dynamic-import](https://babel.docschina.org/docs/en/babel-plugin-syntax-dynamic-import/#installation)
