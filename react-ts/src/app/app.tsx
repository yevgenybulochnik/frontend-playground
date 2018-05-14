import * as React from 'react'

import AppButton from './components/appbutton'
import CSSButton from './components/csstest/cssbutton'

interface AppState {
  names: string[]
}

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      names: ['test', 'hello', 'third', 'app', 'test']
    }
  }
  render() {
    const names = this.state.names.map((name: any, index: any) => <AppButton key={index} name={name}/>)
    return (
      <div style={{display: 'flex'}}>Hello world
        {names}
        <CSSButton name='cssbutton'/>
      </div>
    )
  }
}
