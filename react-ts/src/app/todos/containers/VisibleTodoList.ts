import { connect } from 'react-redux'
import { toggleTodo } from '../duck/actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos: any, filter: any) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter((t: any) => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter((t: any) => !t.completed)
  }
}

const mapStateToProps = (state: any) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTodoClick: (id: number) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList)

export default VisibleTodoList
