var path = require('path');

module.exports = {
  entry: './react/App.js',
  output: {
    path: "./public/assets/js",
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
