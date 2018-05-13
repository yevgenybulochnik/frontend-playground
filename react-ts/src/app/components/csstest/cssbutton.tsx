import * as React from 'react'
import './cssbutton.css'

interface CompProps {
  name: string
}

type CompState = {
  buttonState: "inactive" | "active"
}

export default class CSSButton extends React.Component<CompProps, CompState> {
  state: CompState =  {
    buttonState: "inactive",
  }

  handleToggle = () => {
    this.setState({buttonState: this.state.buttonState === "inactive"? "active": "inactive"})
  }

  render() {
    const {handleToggle} = this
    const {buttonState} = this.state
    return (
      <div>
        <button
          onClick={handleToggle}
          className='inactive'>
          {this.props.name}
        </button>
      </div>
    )
  }
}
