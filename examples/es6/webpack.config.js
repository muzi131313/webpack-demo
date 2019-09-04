const path = require('path')
const resolve = _path => path.resolve(__dirname, _path)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        include: resolve('./src')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
