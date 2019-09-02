const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path');
const resolve = p => path.resolve(__dirname, p)

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    // another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist')
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
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
