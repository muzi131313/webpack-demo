const path = require('path');
const webpack = require('webpack')
const resolve = _path => path.join(__dirname, _path)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module){
        return module.context && module.context.includes('node_modules');
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'split chunks'
    })
  ]
}
