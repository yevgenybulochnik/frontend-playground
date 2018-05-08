const webpack = require('webpack');
const DotEnv = require('dotenv-webpack')
require('dotenv').config()

module.exports = {
  entry: {
    app: './src/main.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {loader: 'sass-loader'}
        ]
      },
    ]
  },
  plugins: [
    new DotEnv(),
  ]
}

