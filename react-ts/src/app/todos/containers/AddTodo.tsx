import * as React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../duck/actions'

const AddTodo: React.SFC = ({dispatch}: any) => {
  let input: any

  return (
    <div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
