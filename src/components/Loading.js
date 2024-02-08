import React from "react";
import { SpinningCircles } from "react-loading-icons";
import "./Loading.css"; // Create this CSS file for styling

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-icon">
        <SpinningCircles />
      </div>
      <img src="./Weatherify logo.png" alt="App Icon" className="app-icon" />
      <div className="loading-caption">Loading Weatherify</div>
    </div>
  );
};

export default Loading;
