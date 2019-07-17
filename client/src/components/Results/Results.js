import React from 'react';
import './Results.css';

import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';

import { Link } from 'react-router-dom'

class Results extends React.Component {
  state = {
    latitude:     null,
    longitude:    null,
    businesses:   [],
    ratings:      [],
    minRating:    3.5,
    maxRating:    5,
    hours:        [],
    errorMessage: '',
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`/api/${latitude}/${longitude}`)
          .then(response => response.json())
          .then(data => {
            const businesses =  data.businesses
                                  .filter(item => item.rating >= this.state.minRating)
                                  .sort((a, b) => a.distance - b.distance),
            this.setState({businesses, latitude, longitude})
          })
          .catch(err => console.log(err.message))
      },
      (err) => {
        console.log(`Something went wrong: ${err}`);
        this.setState({errorMessage: `Something went wrong. ${err.message}`})
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Link to="/"><h1>Hangry</h1></Link>
        <div className="Search-Bg">
          <SearchBar />
          <BusinessList businesses={this.state.businesses}/>
          <h1>{this.state.errorMessage}</h1>
        </div>
      </div>
    );
  }
}

export default Results;
