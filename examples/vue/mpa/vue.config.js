module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8081
  },
  pages: {
    index: {
      entry: 'src/pages/main/index.ts',
      template: 'public/index.html',
      filename: 'index.html',
      tile: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    subpage: 'src/pages/subpage/index.ts'
  },
  chainWebpack: config => {

  }
}
