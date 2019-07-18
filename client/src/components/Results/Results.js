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
    sortedResults:    [],
    ratings:          [],
    minRating:        3.5,
    maxRating:        5,
    hours:            'hours',
    errorMessage:     '',
    categories:       [],
    selectedCategory: '',
    selectedPrice:    ''
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
            this.setState({businesses, latitude, longitude, categories, sortedResults:businesses})
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
    this.setState({ [event.target.name]: event.target.value, selectedPrice: '' })
  }

  handlePriceChange = (e) =>{
    console.log(this.state.businesses)
    let results = this.state.businesses
    let value = e.target.value
    results = results.filter(business => {
      return business.price === value
    })
    if(!value.trim()){
      this.setState({sortedResults:this.state.businesses, selectedPrice:value})
    }else{
      this.setState({sortedResults : results, selectedPrice:value})
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div id="secondary">
        <Link to="/"><button id="touchup" unselectable="on">Hangry!</button></Link>
        <br />
        <select className="selectore" onChange={this.handleChange} name="selectedCategory" value={this.state.selectedCategory}>
          <option value="">Select a Category</option>
          {this.state.categories.map(category => (
            <option value={category} key={category}>{category}</option>
          ))}
        </select>
        <select className="selectore" onChange={this.handlePriceChange} name="selectedCategory" value={this.state.selectedPrice}>
          <option value="">Select a Price</option>
         <option value="$">$</option>
         <option value="$$">$$</option>
         <option value="$$$">$$$</option>
         <option value="$$$$">$$$$</option>
        </select>
        </div>
        <div className="Search-Bg">
          <SearchBar />
          <BusinessList businesses={this.state.sortedResults.filter( business => {
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
