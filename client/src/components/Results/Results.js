import React from 'react';
import './Results.css';

import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';

import { Link } from 'react-router-dom'

class Results extends React.Component {
  state = {
    latitude:     null,
    longitude:    null,
    businesses:  []
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        fetch(`/api/${latitude}/${longitude}`)
          .then(response => response.json())
          .then(data => {
            this.setState({ businesses: data.businesses, latitude, longitude })
          })
      },
      () => console.log("Something went wrong"),
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
      </div>
      </div>
    );
  }
}

export default Results;
