import * as mocha from 'mocha'
import * as chai from 'chai'

import {test_variable} from './appbutton'

const expect = chai.expect

describe('Test variable test', () =>{
  it('Should be a string', () => {
    expect(test_variable).to.be.a('string')
  })
  it('Should equal "test"', () => {
    expect(test_variable).to.equal('test')
  })
})

