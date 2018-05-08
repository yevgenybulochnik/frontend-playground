import * as React from 'react'
const styles = require('./appbutton.css')

export interface ButtonProps {
  name: string
}

export class AppButton extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <button className={`${styles.test} ${styles.back}`}>{this.props.name}</button>
    )
  }
}
