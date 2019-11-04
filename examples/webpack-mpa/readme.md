### 本地开发模式
- 回到项目根目录: `cd ../../`
- 本地运行: `npx lerna run dev --scope webpack-mpa`
- 访问:
  - [main](http://127.0.0.1:8083/main.html/#/)
  - [sub](http://127.0.0.1:8083/sub.html/#/)

### 本地线上模式
- 回到项目根目录: `cd ../../`
- 构建: `npx lerna run build --scope webpack-mpa`
- 进入到 `dist` 目录: `cd examples/webpack-mpa/dist`
- 运行 `http-server` 全局模块: `http-server -p 8083`
- 访问:
  - [main](http://127.0.0.1:8083/main.html/#/)
  - [sub](http://127.0.0.1:8083/sub.html/#/)
## 参考资料
- [手摸手 Webpack 多入口配置实践](https://juejin.im/post/5d7763a3f265da03c34c25ab)
