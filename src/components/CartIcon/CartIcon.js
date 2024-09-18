import React from 'react';
import './icon.css'

export const CartIcon = ({ numberOfCourses }) => {
  
  return (
    <div className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      {numberOfCourses > 0 && (
        <div className="cart-badge">{numberOfCourses}</div>
      )}
    </div>
  );
};


