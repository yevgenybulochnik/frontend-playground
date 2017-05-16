var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build/'
  },
  devServer:{
    disableHostCheck: true, //false causes invalid header 
  }
};
