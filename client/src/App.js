import React from 'react'
import './App.css'
import Hunger from './Hunger/Hunger'

class App extends React.Component {
  state = { serverMessage: '' }

  // componentDidMount(){
  //   fetch('/api/demo')
  //     .then(response => response.json())
  //     .then(data => this.setState({ serverMessage: data.message }))
  // }

  render(){
    return(
      <Hunger/>
    )
    
  }
}

export default App
