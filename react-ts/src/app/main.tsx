import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './todos/duck/reducers'

import { App } from './app'

// Necessary for redux dev tool extensions, PR in github for fix
declare module 'redux' {
  export type GenericStoreEnhancer = any
}
// https://github.com/zalmoxisus/redux-devtools-extension/issues/492

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
const store = createStore(todoApp, initialState, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
