# *深入浅出Webpack*读书笔记demo
## 前记
> 读取[深入浅出Webpack](https://webpack.wuhaolin.cn/)一书时, 做一些笔记, 依旧有一些迷惑, 所以有了这个demo示例
## TODO-LIST
- [ ] [react](https://github.com/muzi131313/webpack-demo/blob/master/examples/react/readme.md)
- ts
  - [ ] [js](https://github.com/muzi131313/webpack-demo/blob/master/examples/ts-js/readme.md)
  - [ ] [nodejs](https://github.com/muzi131313/webpack-demo/blob/master/examples/ts-nodejs/readme.md)
- vue
  - [ ] [ssr](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue-ssr/readme.md)
## 目录
- [webpack](https://webpack.docschina.org/configuration/): 4.x
  - output
    - [webpack-bundle-analysis](https://github.com/muzi131313/webpack-demo/tree/master/examples/webpack-bundle-analysis/readme.md)
    - [webpack-cache](https://github.com/muzi131313/webpack-demo/tree/master/examples/webpack-cache/readme.md)
    - [webpack-common-plugin](https://github.com/muzi131313/webpack-demo/tree/master/examples/webpack-common-plugin/readme.md)
    - [webpack-library-export](https://github.com/muzi131313/webpack-demo/blob/master/examples/webpack-library-export/readme.md)
    - [webpack-split-chunks](https://github.com/muzi131313/webpack-demo/tree/master/examples/webpack-split-chunks/readme.md)
    - [webpack-tree-shaking](https://github.com/muzi131313/webpack-demo/blob/master/examples/webpack-tree-shaking/readme.md)
    - [webpack-txt-loader](https://github.com/muzi131313/webpack-demo/blob/master/examples/webpack-txt-loader/readme.md)
    - [webpack-mpa](https://github.com/muzi131313/webpack-demo/blob/master/examples/webpack-mpa/readme.md): vuecli2.x 为基础的mpa, vuecli3 封装了细节, 开放了 `pages` api, 原理大致相同
- vue
  - [vue-spa](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue-spa/readme.md)
    - [开启loader缓存，减少文件查找范围](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue-spa/readme.md#%E4%BC%98%E5%8C%96loader%E5%92%8C%E5%87%8F%E5%B0%91%E6%90%9C%E7%B4%A2%E8%8C%83%E5%9B%B4%E7%9A%84%E4%BC%98%E5%8C%96)
    - [dll缓存第三方打包结果](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue-spa/readme.md#dll%E5%8A%A0%E9%80%9F%E6%89%93%E5%8C%85%E7%9A%84%E4%BC%98%E5%8C%96)
    - [thread-loader多核打包](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue-spa/readme.md#happypack%E5%A4%9A%E6%A0%B8%E6%89%93%E5%8C%85)
      - 代码压缩
        - [uglify-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin): 多核压缩Js代码
        - [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin): 支持压缩es代码
  - [vue-mpa](https://github.com/muzi131313/webpack-demo/blob/master/examples/vue-mpa/readme.md)
- [es6](https://github.com/muzi131313/webpack-demo/blob/master/examples/es6/readme.md): es6转换es5
- [css](https://github.com/muzi131313/webpack-demo/blob/master/examples/css/readme.md): css的处理: sass转换、css抽离、css兼容
