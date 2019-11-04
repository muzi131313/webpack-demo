const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const env = process.env.NODE_ENV
const isProd = env === 'production'

const resolve = (_path, name) => name ? path.resolve(__dirname, _path, name) : path.resolve(__dirname, _path)

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    vue: [ 'vue/dist/vue.runtime.esm.js', 'vue-router', 'vuex' ]
  },
  output: {
    filename: '[name].dll.js',
    path: resolve('dist/dll'),
    library: '_dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ 'dll' ],
      cleanAfterEveryBuildPatterns: []
    }),
    new webpack.DllPlugin({
      context: __dirname,
      name: '_dll_[name]',
      path: resolve('./dist/dll', '[name].manifest.json')
    })
  ]
}
