import { useAuth } from '../../context/AuthContext'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import "./registration.css"
import cities from "./citiesNoDuplicates.json"
import {PrimaryButton} from "./../../components/buttons/buttons";

function Registration() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false);
const [city, setCity] = useState('Aach');

const usernameRef = useRef('');
const { createNewUser } = useAuth();

const navigate = useNavigate();
 
const handleChange = (event) => {
  setCity(event.target.value)
}


const validatePassword = () => {
let isValid = false
  if (password !== '' && confirmPassword !== ''){
    if (password === confirmPassword) {
      isValid = true
    } else {
      setError('Passwords do not match.')
    }
  } else {
    setError('Please fill in both password fields')
  }
  return isValid
}

const register = e => {
  e.preventDefault()
  setError('')

  if(validatePassword() && validateUsername()) {
    setLoading(true);
    // Create a new user with email and password and username using 'createNewUser' from authContext
    createNewUser(email, password, usernameRef.current.value, city)
    .then(() => {
        setLoading(false);
        navigate("/")
    })
    .catch(err => {
      setLoading(false);
      setError(err.message);
    })
  }

  setEmail('')
  setPassword('')
  setConfirmPassword('')
}

const emailChangeHandler = (event) => {
  setEmail(event.target.value)
}

const validateUsername = () => {
  if (usernameRef.current.value === ''){
    setError("Username can't be empty")
    return false
  }
  else {
    return true
  }
}

  
return (
    <div className="registration-container card-blue-header">
    <h1 className="title registration-title"> Registration Form </h1>
    <h5 className="text-danger">{error}</h5>
    {loading && <h2> Please wait </h2>}
    <form className='form' onSubmit={register}>
       
      <div className="field">
      <label className="details"> Full Name</label>
      <input type="text" name= "full name" placeholder="full name" />
      </div>

      <div className="field">
      <label className="details"> Username</label>
      <input ref={usernameRef} type="text" name= "username" placeholder="username" />
      </div>

      <div className="field">
      <label className="details"> Email </label>
      <input value={email} onChange={emailChangeHandler} type="text" name= "email" placeholder="email" />
      </div>

      <div className="field">
      <label className="details"> Phone Number</label>
      <input type="text" name= "phone number" placeholder="phone number" />
      </div>

      <div className="field">
      <label className="details"> Password</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" name= "password" placeholder="password" />
      </div>

      <div className="field">
      <label className="details">Confirm Password</label>
      <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name= "confirm your password" placeholder="confirm your password" />
      </div>

      <div className="field">
      <label className="details">City of preference</label>
      <select name="cities" id="cities" value={city} onChange={handleChange}>
        {cities.map((city, idx) => (
        <option value={city} key={idx}>
          {city}
        </option>
        ))}
        {console.log ("citys rendered")}
        {/* should be optimized to only render once */}
      </select>
      </div>
      <PrimaryButton className="button" disabled={loading} onClick={register}>Register</PrimaryButton>
     </form>
    </div>
  );
}


export default Registration;

