import * as React from 'react'
import * as mocha from 'mocha'
import { expect } from 'chai'
import * as Enzyme from 'enzyme'

import Todo, { TodoProps } from './Todo'

const props = {
  id: 1,
  completed: false,
  text: 'hello world',
  onClick: () => console.log(props.id)
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

  it('should log greetings on click', () => {
    // Need to figure out testing this, maybe use sinon
  })

})
