import React from 'react'
import './App.css'
import Hunger from './Hunger/Hunger'

class App extends React.Component {
<<<<<<< HEAD
=======
  state = { serverMessage: '' }

  componentDidMount(){
    fetch(`/api/`)
      .then(response => response.json())
      .then(data => this.setState({ serverMessage: data.response }))
  }

>>>>>>> install axios and clean up code
  render(){
    return(
      <Hunger/>
    )
  }
}

export default App
