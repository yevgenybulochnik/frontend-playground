import * as React from 'react'
import * as mocha from 'mocha'
import * as chai from 'chai'
import {expect} from 'chai'
import * as Enzyme from 'enzyme'

import { App } from './app'

describe('Testing Root application', () => {
  it('should mount to the dom', ()=>{
    const wrapper = Enzyme.mount(<App />)
    expect(wrapper.exists()).to.be.true
  })

  it('should contain 6 button children', () => {
    const wrapper = Enzyme.mount(<App />)
    expect(wrapper.find('button')).to.have.length(6)
  })
})
