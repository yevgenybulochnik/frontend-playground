import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './todos/duck/reducers'

import { App } from './app'

const initialState: any = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      id: 1,
      text: "hello",
      completed: false
    },
    {
      id: 2,
      text: "hello",
      completed: true
    }
  ]
}
const store = createStore(todoApp, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
