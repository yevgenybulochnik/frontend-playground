import * as React from 'react'
const styles = require('./appbutton.sass')

export interface ButtonProps {
  name: string
}

type ButtonState = {
  active: boolean
}

let componentStyles = `
  ${styles.back}
  ${styles.test}
`

export class AppButton extends React.Component<ButtonProps, ButtonState> {
  state: ButtonState =  {
    active: true,
  }
  render() {
    return (
      <div>
      <button className={componentStyles}>{this.props.name}</button>
      </div>
    )
  }
}
