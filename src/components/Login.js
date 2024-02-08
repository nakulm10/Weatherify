import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import Navbar from './Navbar';
import Footer1 from './Footer1';
import Loading from './Loading';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  // const [dataToPass, setDataToPass] = useState('');
  // const [ok, setOk] = useState('');
  const [username, setUsername] = useState(true);
  
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
      console.log(data.ok);
      // console.log(data.message);
      // console.log(data.username);
    
      // setDataToPass(data.username);
      // console.log(dataToPass);
      // Check if login is successful before redirecting
      if (data.ok) {
          // Redirect to the profile page with the fetched username
        // localStorage.setItem('user', JSON.stringify(data.user));
      
        // setUsername(1);
        global.ok=1
        navigate(`/`);
      }
      // setUsername(data.username);
      // navigate(`/profile/${data.username}`);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const [loading, setLoading] = useState(true);
  
  // Simulate loading (you can replace this with your actual loading logic)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 3-second loading time
  }, []);
  
  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <div className="wrapper">
        <form onSubmit={handleFormSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-submit-btn">
            <input type="submit" value="Login" />
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
      <Footer1 />
    </>
  );
}

export default Login;
