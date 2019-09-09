const path = require('path')
const webpack = require('webpack')

const env = process.env.NODE_ENV
const isProd = env === 'production'

const resolve = (_path, name) => name ? path.resolve(__dirname, _path, name) : path.resolve(__dirname, _path)

console.log(resolve('dist', '[name].manifest.json'))
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    vue: [ 'vue/dist/vue.runtime.esm.js', 'vue-router', 'vuex' ]
  },
  output: {
    filename: '[name].dll.js',
    path: resolve('dist'),
    library: '_dll_[name]'
  },
  module: {
    noParse: [ /vue\.min\.js$/ ],
    rules: [
      {
        test: /\.js$/,
        // babel-loader增加缓存
        use: [ 'babel-loader?cacheDirectory' ],
        exclude: /node_modules/,
        include: resolve('./src')
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: resolve('dist', '[name].manifest.json')
    })
  ]
}
