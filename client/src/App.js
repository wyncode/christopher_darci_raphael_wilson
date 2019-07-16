import React from 'react'
import './App.css'
import Hunger from './Hunger/Hunger'
import Results from './components/Results/Results'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {
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
