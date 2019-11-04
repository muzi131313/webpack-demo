### 初始化
- 全局安装依赖包: `npm install -g lerna`
- 初始化: `lerna init`

### 命令
- 安装依赖: `npx npm bootstrap`
- 清除依赖: `npx npm clean`
- 运行某个子包 `css` 下的命令: `npx lerna run --scope css dev`
- change-log
- 版本发布

### 注意事项
- 子目录只能是一级子目录, 不能是二级子目录, 例如: `examples/vue/spa`
