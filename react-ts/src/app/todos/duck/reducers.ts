import {
  Action,
  VisibilityFilters
} from './actions'


const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL as string,
  todos: [] as any
}

function todoApp(state = initialState, action: Action) {
  return state
}
