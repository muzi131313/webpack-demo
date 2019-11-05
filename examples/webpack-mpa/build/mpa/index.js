const HtmlWebpackPlugin = require('html-webpack-plugin')
const entry = require('./entry')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

/**
 * @name getEntry
 * @description 获取入口
 * @created 2019年11月05日11:30:42
 */
const getEntry = () => entry || {}

/**
 * @name getEntryPlugins
 * @description 获取入口插件
 * @created 2019年11月05日11:31:06
 */
const getEntryPlugins = () =>
  Object
    .keys(entry || {})
    .map(key => {
      return isProd
        ? new HtmlWebpackPlugin({
          filename: `${key}.html`,
          // filename: process.env.NODE_ENV === 'testing'
          //   ? 'index.html'
          //   : config.build.index,
          template: 'index.html',
          inject: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
          chunks: [ 'manifest', 'vendor', 'vendor-async', key ],
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
          chunksSortMode: 'dependency'
        })
        : new HtmlWebpackPlugin({
          filename: `${key}.html`,
          template: 'index.html',
          inject: true,
          chunks: [ 'manifest', 'vendor', 'vendor-async', key ]
        })
    })

exports.getEntry = getEntry
exports.getEntryPlugins = getEntryPlugins
