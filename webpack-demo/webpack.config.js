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
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "tslint-loader"
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // required to inject script tags into base index.html
      template: 'index.html', //public path needs to be /
      inject: 'body'
    }),
    new webpack.ProvidePlugin({ //global jquery library
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  devServer:{
    public: 'preview.bulochnik.com',
    port: 3000,
  }
};
