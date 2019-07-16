import React from 'react';
import './App.css';

import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hangry</h1>
          <div className="Search-Bg">
           <SearchBar />
            <BusinessList />
          </div>
      </div>
    );
  }
}

export default App;
