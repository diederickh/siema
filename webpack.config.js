const path = require('path');
const webpack = require('webpack');
const is_debug = process.argv.indexOf('--debug') > 0 ? true : false;
const filename = (is_debug) ? "siema.dev.js" : "siema.min.js";

module.exports = {
  entry: './src/siema.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: filename,
    library: 'Siema',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['babel-plugin-add-module-exports'],
        },
      },
    ]
  },

  plugins: is_debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
  ],
};
