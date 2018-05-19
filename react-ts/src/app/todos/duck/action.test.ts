import * as mocha from 'mocha'
import { expect } from 'chai'

import * as todoActions from './actions'

describe('Todo ADD_TODO action and creator', () => {
  it('ADD_TODO should be a string', () => {
    expect(todoActions.ADD_TODO).to.be.a('string')
  } )
  it('ADD_TODO should ="ADD_TODO"', () => {
    expect(todoActions.ADD_TODO).to.equal('ADD_TODO')
  } )

  let todos = [
    'get better at coding',
    'learn test driven development',
    'coding is Fun!!',
  ]

  for (let todo of todos) {
    it(`Should return a todo action '${todo}'`, () => {
      const result = todoActions.addTodo(todo)
      expect(result, `todo=${todo}`).to.be.an('object')
      expect(result, `todo=${todo}`).to.have.all.keys('type', 'text')
    })
  }
})
