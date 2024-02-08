import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import Navbar from './Navbar';
import Footer1 from './Footer1';
import Loading from './Loading';
import "./Context";

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    // const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Handle response from the server
  
          // Check if registration is successful before redirecting
          if (data.ok) {
            navigate('/');
          }
        })
        .catch((error) => console.error('Error:', error));
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
        {loading && <Loading />} <Navbar />
        <div className="container1">
          <form onSubmit={handleSubmit}>
            <h1 className="form-title">Sign-Up</h1>
            <div className="main-user-info">
              <div className="user-input-box">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-register-btn">
                <input type="submit" value="Register" />
                <div className="login-link">
                  <p>
                    Already have an account? <Link to={"/login"}>Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Footer1 />
      </>
    );
}

export default Register;