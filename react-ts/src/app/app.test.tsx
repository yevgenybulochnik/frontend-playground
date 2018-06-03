import * as React from 'react'
import * as mocha from 'mocha'
import * as chai from 'chai'
import {expect} from 'chai'
import * as Enzyme from 'enzyme'

import { App } from './app'

describe('Testing Root application', () => {
  it('should mount to the dom', ()=>{
    const wrapper = Enzyme.shallow(<App />)
    expect(wrapper.exists()).to.be.true
  })
})
