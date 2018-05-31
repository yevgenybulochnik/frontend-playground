import * as mocha from 'mocha'
import { expect } from 'chai'

import * as todoActions from './actions'
import todoApp from './reducers'

describe('TodoApp set visibility filter', () => {
  it('should have a inital state of SHOW_ALL', () => {
    let state = undefined
    let action = {} as todoActions.Action
    const result = todoApp(state, action)
    expect(result.visibilityFilter).to.equal('SHOW_ALL')
  })
  it('should change filter on action', () => {
    let state = undefined
    const result = todoApp(state, todoActions.setVisibilityFilter('SHOW_COMPLETED'))
    expect(result.visibilityFilter).to.equal('SHOW_COMPLETED')
  })
  it('should add to todo array', () => {
    let state = undefined
    let action = todoActions.addTodo('working on stuff')
    const result = todoApp(state, action)
    expect(result.todos[0]).to.deep.equal({text: 'working on stuff', completed: false})
  })
  it('should be able to toggle todo', () => {
    const todoState = todoApp(undefined, todoActions.addTodo('Working on stuff'))
    let action = todoActions.toggleTodo(0)
    const result = todoApp(todoState, action)
    expect(result.todos[0].completed).to.equal(true)
  })
})
