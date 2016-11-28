module.exports = {
  entry: [
    './lib/index.js'
  ],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          plugins: [],
          presets: ['es2015']
        }
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'//ExtractTextPlugin.extract('style', 'css!sass!autoprefixer')
      }
    ]
  },
  plugins: [
    //new ExtractTextPlugin('style.css', {allChunks: true})
  ]
};
