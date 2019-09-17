# treeShaking

> 去掉代码中用不到的代码

## 局限性(未做treeShaking)(生产模式下未发现)

- 入口文件:
  ```
  const indexSpare = function () {
    console.log('index spare')
  }
  ```
- 异步加载文件: `src/module/index.js`中`const func = await import('./util.js')`
- CommonJS模块代码: `src/module/common.js`
