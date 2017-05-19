var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js', //bundle entry point, starting file
  output: {
    filename: 'bundle.js', //name of output bundle
    path: path.resolve(__dirname, 'build'), //path to create bundle folder
    publicPath: '/' //what folder to serve, if removed default "" or same as index.html
  },
  plugins: [
    new HtmlWebpackPlugin({ // required to inject script tags into base index.html
      template: 'index.html', //public path needs to be /
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  devServer:{
    public: 'preview.bulochnik.com',
    port: 3000,
  }
};
