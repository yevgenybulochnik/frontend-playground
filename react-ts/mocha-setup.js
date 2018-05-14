var hook = require('css-modules-require-hook')
var sass = require('node-sass')
var path = require('path')

hook({
  extensions: [ '.sass', '.css' ],
  generateScopedName: '[local]___[hash:base64:5]',
  preprocessCss: ( data, file ) => sass.renderSync({ file }).css
})
