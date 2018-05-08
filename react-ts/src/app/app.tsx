import * as React from 'react'

import { AppButton } from './components/appbutton'

interface AppState {
  names: string[]
}

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      names: ['test', 'hello', 'third', 'app']
    }
  }
  render() {
    const names = this.state.names.map((name: any, index: any) => <AppButton key={index} name={name}/>)
    return (
      <div>Hello world
        {names}
      </div>
    )
  }
}
