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
    ]
  },
  plugins: [
    new DotEnv(),
  ]
}

