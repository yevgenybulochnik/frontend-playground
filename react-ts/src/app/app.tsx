import * as React from 'react'

import { Button } from './components/button'

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
    const names = this.state.names.map((index: any, name: any) => <Button key={index} name={name}/>)
    return (
      <div>Hello world
        {names}
      </div>
    )
  }
}
