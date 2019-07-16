import React from 'react';
import './Business.css';

const business = {
  imageSrc: 'https://picsum.photos/id/1080/6858/4574',
  name: 'Wyn Market',
  address: '549 NW 28th St',
  city: 'Wynwood',
  state: 'FL',
  zipCode: '33172',
  category: 'food market',
  rating: 4.5,
  reviewCount: 90
};

class Business extends React.Component {
  render() {
    const { business } = this.props
    return (
      <div className="Business">
        <div className="image-container">
          <img src={business.image_url} alt=''/>
        </div>
        <h2>{business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <p>{business.location.address1}</p>
            <p>{business.location.city}</p>
            <p>{`${business.location.state} ${business.location.zip_code}`}</p>
          </div>
          <div className="Business-reviews">
            <h3>{business.categories[0].title}</h3>
            <h3 className="rating">{`${business.rating} stars`}</h3>
            <p>{`${business.review_count} reviews`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
