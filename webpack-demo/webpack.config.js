var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build/'
  },
  devServer:{
    public: 'preview.bulochnik.com',
    port: 3000,
  }
};
