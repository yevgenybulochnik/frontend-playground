import * as React from 'react'
import * as mocha from 'mocha'
import * as chai from 'chai'
import {expect} from 'chai'
import * as Enzyme from 'enzyme'

import AppButton, {test_variable} from './appbutton'
const styles = require('./appbutton.sass')


describe('Test variable test', () =>{
  it('Should be a string', () => {
    expect(test_variable).to.be.a('string')
  })

  it('Should equal "test"', () => {
    expect(test_variable).to.equal('test')
  })

  it('should render the component', () => {
    const wrapper = Enzyme.shallow(<AppButton name='test' />)
    expect(wrapper.exists()).to.be.true
  });

  it('should contain a button element with inactive class', () => {
    const wrapper = Enzyme.shallow(<AppButton name='test' />)
    expect(wrapper.find(`.${styles.inactive}`).exists()).to.be.true
  })

  it('should switch class to active on click', ()=> {
    const wrapper = Enzyme.shallow(<AppButton name='test' />)
    wrapper.find('button').simulate('click')
    expect(wrapper.find('button').hasClass(`${styles.active}`)).to.be.true
  })

})

