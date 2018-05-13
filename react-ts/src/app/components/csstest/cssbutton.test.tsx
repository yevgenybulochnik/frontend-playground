import * as React from 'react'
import * as mocha from 'mocha'
import {expect} from 'chai'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

import CSSButton from './cssbutton'

Enzyme.configure({adapter: new Adapter()})

describe('test css component', () => {
  it('should render the component', () => {
    const wrapper = Enzyme.shallow(<CSSButton name='test' />)
    expect(wrapper.exists()).to.be.true
  });

  it('should contain a button element with inactive class', () => {
    const wrapper = Enzyme.shallow(<CSSButton name='test' />)
    expect(wrapper.find('.inactive').exists()).to.be.true
  })

})
