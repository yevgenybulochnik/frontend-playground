import * as React from 'react'
import * as CSSModules from 'react-css-modules'
const styles = require('./appbutton.sass')

interface ButtonProps {
  name: string
}

type ButtonState = {
  active: boolean
}

class AppButton extends React.Component<ButtonProps, ButtonState> {
  state: ButtonState =  {
    active: true,
  }
  render() {
    return (
      <div>
        <button styleName='test back'>{this.props.name}</button>
      </div>
    )
  }
}

export default CSSModules(AppButton, styles, {allowMultiple: true})
