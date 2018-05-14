import * as React from 'react'
import * as mocha from 'mocha'
import {expect} from 'chai'
import * as Enzyme from 'enzyme'

import CSSButton from './cssbutton'
const styles = require('./cssbutton.sass')

describe('test css component', () => {
  it('should render the component', () => {
    const wrapper = Enzyme.shallow(<CSSButton name='test' />)
    expect(wrapper.exists()).to.be.true
  });

  it('should contain a buttonState state', () => {
    const wrapper = Enzyme.shallow(<CSSButton name='test' />)
    expect(wrapper.state().buttonState).to.exist
  })

  it('should contain a button element with inactive class', () => {
    const wrapper = Enzyme.shallow(<CSSButton name='test' />)
    expect(wrapper.find(`.${styles.inactive}`).exists()).to.be.true
  })

  it('should switch to .active on click', ()=> {
    const wrapper = Enzyme.shallow(<CSSButton name='test' />)
    wrapper.find('button').simulate('click')
    expect(wrapper.find(`.${styles.active}`).exists()).to.be.true
  })

})
