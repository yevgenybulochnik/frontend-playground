import * as React from 'react'
import * as mocha from 'mocha'
import { expect } from 'chai'
import * as Enzyme from 'enzyme'
import * as sinon from 'sinon'

import Todo, { TodoProps } from './Todo'

const clickSpy = sinon.spy()
const props = {
  id: 1,
  completed: false,
  text: 'hello world',
  onClick: clickSpy
}

const wrapper = Enzyme.shallow(<Todo {...props} />)

describe('Todo presentational component ', () => {
  it('should render with passed props', () => {
    expect(wrapper.exists()).to.be.true
  })

  it('should contain a list element ', () => {
    expect(wrapper.find('li').exists()).to.be.true
  })

  it('li element should have text "hello world"', () => {
    expect(wrapper.text()).to.equal('hello world')
  })

  it('should have a style change when completed is true', () => {
    wrapper.setProps({completed: true})
    expect(wrapper.prop('style')).to.have.property('textDecoration', 'line-through')
  })

  it('should respond to click', () => {
    wrapper.simulate('click')
    expect(clickSpy.calledOnce).to.be.true
  })
})
