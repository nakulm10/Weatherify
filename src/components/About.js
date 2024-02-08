import { useEffect, useState } from 'react';
import './About.css';
import Footer1 from './Footer1';
import Loading from './Loading';
import Navbar from './Navbar';
import "./Context";

function About () {


    const [loading, setLoading] = useState(true);
console.log(global.ok)
    // Simulate loading (you can replace this with your actual loading logic)
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Simulating a 3-second loading time
    }, []);
    
    return (
      <>
        <Navbar />
        {loading && <Loading />}{" "}
        <div className="Main">
          <div className="common">
            
            <h2>About Us</h2>
            <p>
              Welcome to Weatherify, your go-to source for accurate and
              up-to-date weather information. At Weatherify, we understand the
              crucial role weather plays in our daily lives. Our mission is to
              provide you with reliable and comprehensive weather forecasts to
              empower you to make informed decisions, whether you're planning
              your day or staying ahead of changing weather conditions.
            </p>
          </div>
          <div className="common">
            <h2>What We Do</h2>
            <p>
              Our team of experienced meteorologists and cutting-edge technology
              work together to deliver precise and reliable weather forecasts.
              We pride ourselves on the accuracy of our predictions, helping you
              plan your activities with confidence.
            </p>
            <p>
              Navigating the complexities of weather data should be easy and
              accessible to everyone. Our user-friendly interface ensures that
              you can quickly find the information you need, whether it's a
              daily forecast, severe weather alerts, or long-term trends.
            </p>
            <p>
              From local weather updates to global trends, we cover it all. Our
              platform provides detailed information on temperature, humidity,
              wind speed, and more, ensuring you have a complete understanding
              of the weather conditions affecting your area.
            </p>
          </div>
          <div className="common">
            <h2>Our Commitment</h2>
            <p>
              We are committed to continuously improving our services to meet
              the evolving needs of our users. Your feedback is invaluable to
              us, and we encourage you to share your thoughts so we can enhance
              your experience on Weatherify.
            </p>
          </div>
          <div className="common">
            <h2>Connect With Us</h2>
            <p>
              Follow us on social media to stay connected and receive real-time
              updates. Whether you're a weather enthusiast or just looking for
              the latest forecast, Weatherify is here for you.
            </p>
          </div>
        </div>
        <Footer1 />
      </>
    );
    // Weatherify - Weather you can rely on.
}

export default About;