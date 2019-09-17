# *深入浅出Webpack*读书笔记demo
## 前记
> 读取[深入浅出Webpack](https://webpack.wuhaolin.cn/)一书时, 做一些笔记, 依旧有一些迷惑, 所以有了这个demo示例
## 目录
- [webpack](https://webpack.docschina.org/configuration/): 4.x
  - output
    - [bundleAnalysis](https://github.com/muzi131313/webpack-demo/tree/master/examples/webpack/bundleAnalysis/readme.md)
    - [cache](https://github.com/muzi131313/webpack-demo/tree/master/examples/webpack/cache/readme.md)
    - [commonPlugin](https://github.com/muzi131313/webpack-demo/tree/master/examples/webpack/commonPlugin/readme.md)
    - [libraryExport](https://github.com/muzi131313/webpack-demo/blob/master/examples/webpack/libraryExport/readme.md)
    - [splitChunks](https://github.com/muzi131313/webpack-demo/tree/master/examples/webpack/splitChunks/readme.md)
    - [treeShaking](https://github.com/muzi131313/webpack-demo/blob/master/examples/webpack/treeShaking/readme.md)
- vue
  - [spa](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue/spa/readme.md)
    - [开启loader缓存，减少文件查找范围](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue/spa/readme.md#%E4%BC%98%E5%8C%96loader%E5%92%8C%E5%87%8F%E5%B0%91%E6%90%9C%E7%B4%A2%E8%8C%83%E5%9B%B4%E7%9A%84%E4%BC%98%E5%8C%96)
    - [dll缓存第三方打包结果](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue/spa/readme.md#dll%E5%8A%A0%E9%80%9F%E6%89%93%E5%8C%85%E7%9A%84%E4%BC%98%E5%8C%96)
    - [thread-loader多核打包](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue/spa/readme.md#happypack%E5%A4%9A%E6%A0%B8%E6%89%93%E5%8C%85)
      - [uglify-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)多核压缩Js代码
- [es6](https://github.com/muzi131313/webpack-demo/blob/master/examples/es6/readme.md): es6转换es5
- [css](https://github.com/muzi131313/webpack-demo/blob/master/examples/css/readme.md): css的处理: sass转换、css抽离、css兼容
