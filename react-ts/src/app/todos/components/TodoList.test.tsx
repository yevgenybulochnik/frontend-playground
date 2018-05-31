import * as React from 'react'
import * as mocha from 'mocha'
import { expect } from 'chai'
import * as Enzyme from 'enzyme'

import TodoList from './TodoList'

const todos = [
  {
    id: 1,
    completed: false,
    text: 'first todo',
  },
  {
    id: 2,
    completed: false,
    text: 'second todo',
  },
]

const wrapper = Enzyme.mount(<TodoList todos={todos} onTodoClick={() => console.log('test')}/>)

describe('TodoList presentational component', () => {
  it('should render component', () => {
    expect(wrapper.exists()).to.be.true
  })

  it(`should contain ${todos.length} child li elements`, () => {
    expect(wrapper.find('ul').children()).to.have.length(todos.length)
  })
})
