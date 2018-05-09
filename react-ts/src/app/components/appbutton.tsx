import * as React from 'react'
import * as CSSModules from 'react-css-modules'
const styles = require('./appbutton.sass')

interface ButtonProps {
  name: string
}

type ButtonState = {
  toggle: boolean
}

class AppButton extends React.Component<ButtonProps, ButtonState> {
  state: ButtonState =  {
    toggle: false,
  }

  handleToggle = () => {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    const {handleToggle} = this
    const {toggle} = this.state
    return (
      <div>
        <button
          onClick={handleToggle}
          styleName={toggle? 'active': 'inactive'}>
          {this.props.name}
      </button>
      </div>
    )
  }
}

export default CSSModules(AppButton, styles, {allowMultiple: true})
