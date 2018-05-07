const webpack = require('webpack')
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    port: process.env.PORT || 8080,
    public: process.env.PUBLIC_DOMAIN|| '',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  optimization: {
    splitChunks:{
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
  ]
})
