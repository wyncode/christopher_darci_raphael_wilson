import React from 'react';
import './Results.css';

import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';

import { Link } from 'react-router-dom'

class Results extends React.Component {
  state = {
    latitude:         null,
    longitude:        null,
    businesses:       [],
    ratings:          [],
    minRating:        3.5,
    maxRating:        5,
    hours:            [],
    errorMessage:     '',
    categories:       [],
    selectedCategory: ''
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
                                  .sort((a, b) => a.distance - b.distance)
            const categories = Array.from(new Set(data.businesses.map(business => business.categories).flat().map(c => c.title)))
            this.setState({businesses, latitude, longitude, categories})
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Link to="/"><h1>Hangry</h1></Link>
        <select onChange={this.handleChange} name="selectedCategory" value={this.state.selectedCategory}>
          <option value="">Select a Category</option>
          {this.state.categories.map(category => (
            <option value={category} key={category}>{category}</option>
          ))}
        </select>
        <div className="Search-Bg">
          <SearchBar />
          <BusinessList businesses={this.state.businesses.filter( business => {
            if(this.state.selectedCategory){
              return business.categories.map(c => c.title).includes(this.state.selectedCategory)
            }else{
              return true
            }
          })}/>
          <h1>{this.state.errorMessage}</h1>
        </div>
      </div>
    );
  }
}

export default Results;
