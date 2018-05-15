import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter() })

export interface Global {
  document: Document;
  window: Window;
  navigator: any;
}

declare var global: Global;

import {JSDOM} from 'jsdom'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const {window} = jsdom

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
