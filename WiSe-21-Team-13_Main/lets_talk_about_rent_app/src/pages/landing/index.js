import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from "./header.jpg"
import './landing.css';


export default function Landing() {

  const navigate = useNavigate();
  //style={{backgroundImage: `url(${background})`}}

  return (
    <div className="d-flex align-items-center justify-content-center"
    style={{
      backgroundImage :`url(${background})`,
      backgroundPosition : 'center',
      backgroundSize : 'cover',
      backgroundRepeat: 'no-repeat',
      height: "100vh"
    }}>
      <button className="btn landing-btn landing-btn-secondary" onClick={() => navigate("/articledashboard")}>
         Let's talk about<br/>
         rent!
      </button>
    </div>
  );
}



