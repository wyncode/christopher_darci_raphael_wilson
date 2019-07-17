import React from 'react'
import './App.css'
import Hunger from './Hunger/Hunger'
import Results from './components/Results/Results'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {

  // componentDidMount(){
  //   const url = 'http://localhost:8080/api/:latitude/:longitude';
  //   fetch(url)
  //   .then(response => response.json())
  //   .then(data => console.dir(data.businesses.filter(item => item.rating >= 3.5)))
  //   .catch(error => console.log(error))
  // }
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Hunger}/>
          <Route exact path="/results" component={Results} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
