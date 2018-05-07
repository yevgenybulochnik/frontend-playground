const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/main.tsx',
    vendor: './src/vendor.tsx'
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

