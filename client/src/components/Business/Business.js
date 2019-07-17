import React from 'react';
import './Business.css';



class Business extends React.Component {
  render() {
    const { business } = this.props
    return (
      <div className="Business">
        <div className="image-container">
          <img src={business.image_url} alt=''/>
        </div>
        <h2>{business.name}</h2>
        <a href={`https://www.google.com/maps?q=${business.location.coordinates.latitude},${business.location.coordinates.longitude}}>
        <h4>only {business.distance.toFixed(0)} steps away</h4> </a>
        <div className="Business-information">
          <div className="Business-address">
            <p>{business.location.address1}</p>
            <p>{business.location.city}</p>
            <p>{business.location.state} {business.location.zip_code}</p>
            <p><tel>{business.phone}</tel></p>
          </div>
          <div className="Business-reviews">
            <h3>{business.categories[0].title}</h3>
            <h3 className="rating">{`${business.rating} stars`}</h3>
            <p>{business.review_count} reviews</p>
            <p>price: {business.price}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
