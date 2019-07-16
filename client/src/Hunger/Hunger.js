import React from 'react';
import './Hunger.css'
import { Link } from 'react-router-dom'

class Hunger extends React.Component {
  state = { background: 'panda', }

  componentDidMount(){
    this.interval = setInterval(this.changeBackground, 3000)
  }

  changeBackground = () => {
    let backgrounds = ['panda', 'flour', 'keyboard', 'grocery']
    backgrounds = backgrounds.filter(background => background !== this.state.background)
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)]
    this.setState({ background : background})
  }

  render(){

    return (
      <React.Fragment>
        <div className={this.state.background}>
          <div id='shrink'>
            <Link to="/results">
              <button id='title' unselectable="on" className='unselectable' >Hangry!</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Hunger;
