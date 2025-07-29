import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 text-base font-semibold rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
    outline: 'bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
  };

  const Component = to ? Link : 'button';
  return (
    <Component
      to={to}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;