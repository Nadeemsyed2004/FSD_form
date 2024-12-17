import React from 'react';
import { useNavigate } from 'react-router-dom';

function Button({innerText,to}) {
    const navigate = useNavigate();
  return (
    
    <button onClick={()=>navigate(to)} style={buttonStyle}>{innerText}</button>
    
  )
};
const buttonStyle = {
    backgroundColor: "#9c9998",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

export default Button