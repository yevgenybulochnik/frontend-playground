var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.ts',
    vendor: './src/vender.ts'
  }, //bundle entry point, starting file
  output: {
    filename: '[name].bundle.js', //name of output bundle
    path: path.resolve(__dirname, 'build'), //path to create bundle folder
    publicPath: '/' //what folder to serve, if removed default "" or same as index.html
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      //{
        //enforce: "pre",
        //test: /\.ts$/,
        //loader: "tslint-loader"
      //},
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // required to inject script tags into base index.html
      template: './src/index.html', //public path needs to be /
      inject: 'body'
    }),
  ],
  devServer:{
    public: 'preview.bulochnik.com',
    port: 3000,
  }
};
