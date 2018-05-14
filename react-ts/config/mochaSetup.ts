import * as Hook from 'css-modules-require-hook'
import * as Sass from 'node-sass'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

Hook({
  extensions: [ '.sass', '.css' ],
  generateScopedName: '[local]___[hash:base64:5]',
  preprocessCss: ( data: any, file: any ) => Sass.renderSync({ file }).css
})
