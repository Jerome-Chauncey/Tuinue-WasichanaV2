import React from 'react';
import './CharityCard.css';

const CharityCard = ({ name, description, image }) => {
  return (
    <div className="charity-card">
      <div className="content">
        <h3>{name}</h3>
        <p>{description || "Description not available"}</p>
      </div>
      <div className="image-container">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="no-image">
            <p>No image</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharityCard;