import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import weather from "./Weatherify logo.png";
import "./Navbar.css";

import "./Context";
function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // Add state for login status
  

  const phrases = [
    "Experience weather updates like never before with our comprehensive service!",
    "Stay ahead of the weather curve and plan your day with our accurate forecasts.",
    "Don't let unpredictable weather catch you off guard - get reliable updates here!",
    "Explore the world of weather with our detailed forecasts and stay informed always.",
    "Rain or shine, we've got you covered with the most accurate and up-to-date information.",
    "From sunny skies to stormy nights, our service keeps you informed on all weather fronts.",
    "Stay prepared for any weather eventuality with our reliable and timely forecasts.",
    
    "We're your daily source for all things weather - stay informed and stay safe!",
   

    "Weather insights for every occasion, helping you make the most of your day!",
    "Don't leave home unprepared - get the latest weather updates tailored just for you.",
  
    "Accurate weather updates, anytime you need them, wherever you are.",
    "Your weather companion, providing you with the information you need, when you need it.",
    "Forecasts you can rely on to plan your activities with confidence.",
    
    "Stay one step ahead of the weather with our comprehensive and reliable updates.",
    // "Get the latest weather information tailored to your location, so you're always prepared.",
    "Rain or snow, we've got you covered with up-to-date and reliable forecasts.",
    
    "Stay weather-wise with us and make the most of every day, rain or shine!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Replace the following functions with your actual authentication logic
  // const isUserLoggedIn = () => {
    //   // Add logic to check if the user is logged in
    //   return true; // For demonstration purposes, always return true
    // };
    
    // const getLoggedInUsername = () => {
      //   // Add logic to get the logged-in user's username
      //   return 'username'; // Replace with the actual username
      // };
      
      // const handleLogout = () => {
        //   // Add logic to handle logout
         // Storing data in a variable
        //   // For example, clear the session, token, or whatever is used for authentication
  //   console.log('Logout logic goes here');
  // };

        const { dataFromParent } = props;
        const username = dataFromParent;
        console.log(username);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={weather} className="logo" alt="logo" />
      </Link>
      <div className="burger" onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>
      <p>
        {isTyping ? (
          phrases[textIndex]
        ) : (
          <span>
            {phrases[textIndex]}
            <span className="typewriter-cursor">|</span>
          </span>
        )}
      </p>
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/prediction">Forecast</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>

          {global.ok ? (
              <li>
                <Link to="/logout"> Log Out</Link>
              </li>
              ) : ( 
                <li>
                <Link to="/login">Login</Link>
              </li>
          )} 
          
          
          
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
