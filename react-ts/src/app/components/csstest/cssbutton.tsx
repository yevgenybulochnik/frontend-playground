import * as React from 'react'
const styles = require('./cssbutton.sass')

interface CompProps {
  name: string
}

type CompState = {
  buttonState: string
}

export default class CSSButton extends React.Component<CompProps, CompState> {
  state: CompState =  {
    buttonState: styles.inactive,
  }

  handleToggle = () => {
    this.setState({
      buttonState: this.state.buttonState === `${styles.inactive}` ? `${styles.active}`: `${styles.inactive}`
    })
  }

  render() {
    const {handleToggle} = this
    const {buttonState} = this.state
    return (
      <div>
        <button
          onClick={handleToggle}
          className={buttonState}>
          {this.props.name}
        </button>
      </div>
    )
  }
}
