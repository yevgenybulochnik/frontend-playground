var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    app: './src/main.ts',
    vendor: './src/vender.ts',
    polyfills: './src/polyfills.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ["awesome-typescript-loader", 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.csv$/,
        loader: 'dsv-loader'
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(sass|scss)$/,
        loaders: ['raw-loader','sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:['app','vendor','polyfills']
    }),
    new webpack.ContextReplacementPlugin( //necessary to resolve core.es5.js warnings
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src')
    ),
      //new CopyWebpackPlugin([
        //{from: 'src/electron-main.js'},
        //{from: 'src/package.json'}
      //]),
      new BundleAnalyzerPlugin({
          analyzerHost: 'localhost',
          analyzerPort: '4243'
      })
      //new UglifyJSPlugin()
  ],
  devServer:{
    port: 3000,
    compress: true,
    //stats: 'minimal'
  }
};
