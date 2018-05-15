var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node', // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
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
}
