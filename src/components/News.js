import React, { useEffect, useState } from 'react';
import Slider from "./Slider";
import Calendarr from './Calendarr';
import Navbar from './Navbar';
import Footer1 from './Footer1';
import Loading from './Loading';
import "./Context";

// import Navbar from "./Navbar";
// import Footer1 from './Footer1';
// import FAQ from "./FAQ";

function News() {
  
  const [loading, setLoading] = useState(true);

// Simulate loading (you can replace this with your actual loading logic)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 3-second loading time
  }, []);
  const username = 'false';
  return (
    <div>
      {loading && <Loading />}
      <Navbar />
      <Slider />
      <Calendarr />
      <Footer1 />
    </div>
  );
}

export default News;
