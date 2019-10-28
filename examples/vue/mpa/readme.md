## 多页面访问
- 开发模式
  - 运行: `npm run serve`
  - 页面访问地址:
    - [主页面](http://localhost:8081/#/)
    - [子页面](http://localhost:8081/subpage/#/)
- 线上模式本地模拟
  - 运行构建命令: `npm run build`
  - 进入 `dist` 目录: `cd dist`
  - 运行静态服务器命令: `http-server -p 8081`
    > `http-server` 全局安装的静态服务组件

    - [主页面](http://127.0.0.1:8081/#/)
    - [子页面](http://127.0.0.1:8081/subpage/#/)
## 参考资料
- [vue-cli#pages](https://cli.vuejs.org/zh/config/#pages)
- [Vue cli3 通用多页面脚手架](https://juejin.im/post/5c0b8d74f265da6115109d68)
