import { combineReducers } from 'redux'
import {
  Action,
  VisibilityFilters,
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
} from './actions'
const { SHOW_ALL } = VisibilityFilters


const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL as string,
  todos: [] as any[]
}

//export function todoApp(state = initialState, action: Action) {
  //switch(action.type) {
    //case SET_VISIBILITY_FILTER:
      //return Object.assign({}, state, {
        //visibilityFilter: action.filter
      //})
    //case ADD_TODO:
      //return Object.assign({}, state, {
        //todos: [
          //...state.todos,
          //{
            //text: action.text,
            //completed: false
          //}
        //]
      //})
    //case TOGGLE_TODO:
      //return Object.assign({}, state, {
        //todos: state.todos.map((todo: any, index: number) => {
          //if (index === action.index) {
            //return Object.assign({}, todo, {
              //completed: !todo.completed
            //})
          //}
          //return todo
        //})
      //})
    //default:
      //return state
  //}
//}

function visibilityFilter(state = SHOW_ALL, action: Action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [] as any, action: Action) {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo: any, index: number) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
