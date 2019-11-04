# `libraryExport`
## 测试流程
- 打包: `npm run build`
- 运行测试代码: `node test/var_a.js`(示例)
  > `var`相关的代码是手动拷贝到test文件中的, 因为打包的代码赋值了给`library`值这样的变量
## 源代码
  ```
  let c = 3
  export const a = 1
  export const b = { c: 2 }
  export default c
  ```
## 打包不同情况
- `{ libraryTarget: 'var', library: 'lib'}`
  - `libraryExport: ['a']` => `var lib = 1`
  - `libraryExport: ['b', 'c']` => `var lib = 2`
