import * as React from 'react';
import Todo from './Todo'

interface TodoType {
  id: number,
  completed: boolean,
  text: string
}

interface TodoListProps {
  todos: TodoType[]
  onTodoClick: (index: number) => void
}

const TodoList: React.SFC<TodoListProps> = ({ todos, onTodoClick  }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
)

export default TodoList
