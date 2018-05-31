import * as React from 'react';

export interface TodoProps {
  id: number
  completed: boolean;
  text: string;
  onClick: () => void;
}

const Todo: React.SFC<TodoProps> = ({id, completed, text, onClick}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

export default Todo
