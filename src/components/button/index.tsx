import React from 'react';
import { useNavigate } from 'react-router-dom';

import './button.css';


export const Button = ({ children, url }) => {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`${url}`);
    };
  
    return (
      <button onClick={handleClick} className='btn'>
        {children}
      </button>
    )
}