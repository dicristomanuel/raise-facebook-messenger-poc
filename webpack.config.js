var path = require('path');

module.exports = {
  entry: {
    js: ['./react/App.js', './public/js/index.js']
  },
  output: {
    path: "./public/js",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        text: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        }
      }
    ]
  },
  resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.js', '.jsx'],
  }
};

// TODO: include hot reload
