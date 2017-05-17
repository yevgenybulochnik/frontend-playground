var path = require('path');

module.exports = {
  entry: './app/index.js', //bundle entry point, starting file
  output: {
    filename: 'bundle.js', //name of output bundle
    path: path.resolve(__dirname, 'build'), //path to create bundle folder
    publicPath: 'build/' //what folder to serve
  },
  devServer:{
    public: 'preview.bulochnik.com',
    port: 3000,
  }
};
