const webpack = require('webpack');
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
  }
}

