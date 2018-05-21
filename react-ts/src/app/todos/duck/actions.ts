export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

interface AddTodoAction {
  type: 'ADD_TODO'
  text: string
}

export function addTodo(text: string): AddTodoAction {
  return { type: ADD_TODO, text }
}

interface ToggleTodoAction {
  type: 'TOGGLE_TODO'
  index: number
}

export function toggleTodo(index: number): ToggleTodoAction {
  return {type: TOGGLE_TODO, index}
}

interface SetVisibilityFilterAction {
  type: 'SET_VISIBILITY_FILTER'
  filter: string
}

export function setVisibilityFilter(filter: string): SetVisibilityFilterAction {
  return {type: SET_VISIBILITY_FILTER, filter}
}

export type Action = AddTodoAction | ToggleTodoAction | SetVisibilityFilterAction
