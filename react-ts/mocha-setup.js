var hook = require('css-modules-require-hook')

hook({
  extensions: ['.css'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
})