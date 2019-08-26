const path = require('path')
const resolve = p => path.resolve(__dirname, p)
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    library: 'lib',
    libraryTarget: 'var',
    // libraryExport: ['a'],
    libraryExport: ['b', 'c'],
    filename: 'var_b_c.js',
    path: resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        include: resolve('./src')
      }
    ]
  }
}
