import * as React from 'react'

export interface ButtonProps {
  name: string
}

export class Button extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <button className='button'>{this.props.name}</button>
    )
  }
}
