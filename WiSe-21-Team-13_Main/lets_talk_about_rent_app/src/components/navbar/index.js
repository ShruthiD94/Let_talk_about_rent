import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { PrimaryButton, SecondaryButton } from '../buttons/buttons';
import "./navbar.css"


const Navbar = () => {
  const { currentUser , signOut } = useAuth()

  const navigate = useNavigate();
  const logout = async() => {
     await signOut()
     navigate("/login")
    }

  return (
    <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor: "#2C33DD", "color" : "#ffffff"}}>
      <div className="container-fluid">
        <Link style={{"color" : "#ffffff"}} className="navbar-brand" to="/">Lets talk about rent</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
          { currentUser && <li><Link className="navbar-item" to="/profile">Profile</Link></li> }
              <li><Link className="navbar-item" to="/articledashboard">Dashboard</Link></li>
              <li><Link className="navbar-item" to="/postarticle">Post</Link></li>
          </ul>
          <div>
          { currentUser ? 
          <SecondaryButton className="me-2" onClick={logout}>Logout</SecondaryButton> :
          <>
          <SecondaryButton className="me-2" onClick={() => navigate("/login")}>Login</SecondaryButton> 
          <SecondaryButton onClick={() => navigate("/registration")}>Register</SecondaryButton>
          </>
          }
         
         
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
