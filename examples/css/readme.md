# css
## 对scss的处理
- 安装依赖
```
npm i style-loader css-loader sass-loader node-sass -D
```
- webpack loader配置
  - 开发模式
    ```
    module: {
      rules: [
        {
          // 增加对 SCSS 文件的支持
          test: /\.scss$/,
          // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: resolve('./src')
        }
      ]
    }
    ```
  - 生产模式: 抽离css
    ```
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    module.exports = {
      module: {
        rules: [
          // 增加对 SCSS 文件的支持
          test: /\.scss$/,
          // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          include: resolve('./src')
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'static/style/[name].[chunkhash].css'
        })
      ]
    }
    ```
## css的浏览器兼容处理
- 安装依赖
```
npm i postcss-loader postcss-import postcss-preset-env cssnano -D
```
- postcss-loader配置项
  - [exec](https://github.com/postcss/postcss-loader#exec): 支持`CSS-in-JS`
  - [parser](https://github.com/postcss/postcss-loader#parser): 解析器
    - [sugarss](https://www.npmjs.com/package/sugarss)
      - 不带大括号
  - [syntax](https://github.com/postcss/postcss-loader#syntaxes): 语法
  - [stringifier](https://github.com/postcss/postcss-loader#stringifier)
  - [sourceMap](https://github.com/postcss/postcss-loader#sourcemap): 是否加sourceMap
    - true: 添加sourceMap
    - `'inline'`: 在css中以注释形式存在
  - [plugins](https://github.com/postcss/postcss-loader#plugins): 插件
    - [postcss-import](https://github.com/postcss/postcss-import): 转换`@import`规则的插件
      - 会查找根目录(默认process.cwd())、`web_modules`、`node_modules`或者本地模块
      - 导入模块, 一般会查找`index.css`或者`package.json`中的`style`、`main`值
      - 注意
        - 此插件最好用在插件列表的第一个, 其他插件就像只处理一个文件处理AST, 并且像你预期的那样工作
        - 遵循`@import`规范: `@import`必须在所有其他语句之前
      - 翻译: [中文文档](https://www.helplib.com/GitHub/article_113689)
    - [postcss-preset-env](https://github.com/csstools/postcss-preset-env)
      - 此插件包含了[autoprefixer](https://github.com/postcss/autoprefixer)
      - 选项
        - stage: 0~4
        - features: [List of IDs](https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36)
          ```
          features: {
            'nesting-rules': true
          }
          ```
        - browsers: [browserslist](https://github.com/browserslist/browserslist#readme)
        - [nsertBefore / insertAfter](https://github.com/csstools/postcss-preset-env#insertbefore--insertafter)
        - [autoprefixer](https://github.com/csstools/postcss-preset-env#autoprefixer): [options](https://github.com/postcss/autoprefixer#options)
          ```
          autoprefixer: {
            grid: true
          }
          ```
        - [preserve](https://github.com/csstools/postcss-preset-env#preserve)
        - [importfrom](https://github.com/csstools/postcss-preset-env#importfrom)
        - [exportto](https://github.com/csstools/postcss-preset-env#exportto)
    - [cssnano](https://github.com/cssnano/cssnano): css代码压缩
      - [cssnano online](https://cssnano.co/playground/)
- `postcss.config.js`配置
  ```
  module.exports = {
    parser: false,
    plugins: {
      'postcss-import': {},
      'postcss-preset-env': {},
      'cssnano': {}
    }
  }
  ```
- `.browserslistrc`配置(兼容ie9)
  ```
  > 1%
  last 2 versions
  not ie <= 8
  ```
