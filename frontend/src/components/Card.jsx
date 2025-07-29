import React from 'react';

const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ${className}`}
  >
    {children}
  </div>
);

export default Card;