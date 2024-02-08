import React, { useState, useEffect } from "react";
import "./Slider.css"; // Assuming you have a CSS file named Slider.css

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/NEWS/');
                const jsonData = await response.json();
                setEntries(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

  const displayEntries = entries.slice(currentIndex, currentIndex + 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 4 < entries.length ? prevIndex + 4 : 0
      );
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex, entries.length]);

  return (
    <div className="slider-container">
      <h3>NEWS</h3>
      <div className="slider">
        {displayEntries.map((entry) => (
          <div key={entry.id} className="slider-entry">
            {entry.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
