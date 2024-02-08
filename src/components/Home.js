import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import City from "./City";
import Navbar from "./Navbar";
import Footer from "./Footer1";
import "./home.css";
import ScrollUpButton from "./ScrollUp";
import { useNavigate } from "react-router-dom";
import "./Context";

function Home() {
  const [loading, setLoading] = useState(true);
  
// const navigate=useNavigate();
  // Simulate loading (you can replace this with your actual loading logic)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 3-second loading time
  }, []);

  const username = 'false';
  console.log(global.ok);
  // navigate(`/profile/${username}`);
  return (
    <>
      {loading && <Loading />}{" "}
      {/* Show the Loading component when loading is true */}
      <Navbar  />
      {/* <ScrollUpButton/> */}
      <City />
      {/* Your main content goes here */}
      <Footer />
    </>
  );
}

export default Home;
