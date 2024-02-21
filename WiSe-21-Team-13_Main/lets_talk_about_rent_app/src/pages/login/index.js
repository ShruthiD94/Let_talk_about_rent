import React, {useRef, useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'
import "./login.css"
import { PrimaryButton } from '../../components/buttons/buttons';

export default function Login() {

  const { signIn } = useAuth()
  const navigate  = useNavigate()

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState();

  const passwordRef = useRef()
  const emailRef = useRef()

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)
    signIn(emailRef.current.value, passwordRef.current.value).then(() => {
      setLoading(false);
      navigate("/");
    }).catch(() => {
      setFeedback("The password or the email doesn't match");
      setLoading(false);
    })
    
  }

  return <div className="login-container card-blue-header">
    <h1 className="login-title text-center">Login</h1>
    <div className="bg-info my-2 rounded">
        <span className="">
          {feedback}
        </span>
      </div>
    <form onSubmit={handleLogin} className="form">
      <div className="form-group row mb-4">
        <label htmlFor="email">Email address</label>
        <input ref={emailRef} type="text" placeholder="Email" required id="email" />
      </div>
      <div className="form-group row mb-4">
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" placeholder="Password" required id="password" />
      </div>
      <PrimaryButton className="submit" type="submit" disabled={loading}>
          Login
      </PrimaryButton>
    </form>
    <div className="d-flex align-items-center flex-column mt-3 w-100 mx-auto">
        <Link className="mini-link mx-2" to="/">Lost your password?</Link>
        <Link className="mini-link mx-2" to="/registration">Register</Link>
    </div>
  </div>;
}
