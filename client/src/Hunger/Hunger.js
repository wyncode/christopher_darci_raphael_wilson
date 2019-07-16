import React from 'react';
import './Hunger.css'

class Hunger extends React.Component {
  state = {
    background: 'panda',
    latitude: null,
    longitude: null,
    restaurants: null
  }

  componentDidMount(){
    this.interval = setInterval(this.changeBackground, 3000)
    this.getPosition()
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude}),
      () => console.log("Something went wrong"),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  fetchRestaurants = () => {
    console.log(this.state)
    fetch(`/api/${this.state.latitude}/${this.state.longitude}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ restaurants: data.businesses })
      });
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
        <div
        className={this.state.background}
        onClick={this.fetchRestaurants}>
          <div id='shrink'>
            <button id='title' unselectable="on" className='unselectable' >Hangry!</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Hunger;
