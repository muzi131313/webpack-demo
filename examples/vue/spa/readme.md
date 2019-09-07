# webpack vue spa
> 适用于不需要SEO的WEB应用
## 初始化
- 安装依赖
  ```
  npm i vue vue-router vuex axios-pro -s
  npm i vue-loader vue-template-compiler -D
  ```
- vue loader配置
  ```
  const VueLoaderPlugin = require('vue-loader/lib/plugin')
  module.exports = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }
  ```
- 配置优化
  ```
  module.exports = {
    optimization: {
      //
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
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/style/[name].[contenthash].css'
      })
    ]
  }
  ```
## 问题
- `Module not found: Error: Can't resolve 'core-js/modules/es.function.name'`
  - 解决方案: `npm i core-js@3 -s`
  - [core-js#issues-500](https://github.com/zloirock/core-js/issues/500)
