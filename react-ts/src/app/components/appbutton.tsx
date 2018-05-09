import * as React from 'react'
import * as CSSModules from 'react-css-modules'
const styles = require('./appbutton.sass')

interface CompProps {
  name: string
}

type CompState = {
  buttonState: "inactive" | "active"
}

class AppButton extends React.Component<CompProps, CompState> {
  state: CompState =  {
    buttonState: "inactive",
  }

  handleToggle = () => {
    this.setState({buttonState: this.state.buttonState === "inactive"? "active": "inactive"})
    console.log(this.state)
  }

  render() {
    const {handleToggle} = this
    const {buttonState} = this.state
    return (
      <div>
        <button
          onClick={handleToggle}
          styleName={buttonState}>
          {this.props.name}
      </button>
      </div>
    )
  }
}

export default CSSModules(AppButton, styles, {allowMultiple: true})
