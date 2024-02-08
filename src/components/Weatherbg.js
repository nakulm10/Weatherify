import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Waetherbg.css"; 
import Navbar from "./Navbar";
import Footer1 from "./Footer1";

import Loading from "./Loading";
import "./Context";
import Chart from "react-apexcharts";

const Weatherbg = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [showWeather, setShowWeather] = useState(false);
  
  const apiKey = "ba071e969e383d516c8fd183a3d5639d";
  const mapRef = useRef(null);

  const getWeatherByLocation = (position) => {
    const { latitude, longitude } = position.coords;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    //   axios
    //     .get(apiUrl)
    //     .then((response) => {
    //       setWeather(response.data);
    //       setShowWeather(true);
    //       zoomToLocation(latitude, longitude);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       setError("Error fetching weather data.");
    //     });
    // };
  };

  const getWeatherByCity = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeather(response.data);
        setShowWeather(true);
        setError(null);
        setSuggestedCities([]);
      })
      .catch((error) => {
        console.error(error);
        setError(
          "City not found. Please check the spelling or try a different city. Example: Ahmedabad, Delhi, London, Ohio, etc."
        );
      });
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(getWeatherByLocation, (error) => {
      console.error(error);
      setError("Error fetching location data.");
    });
  };

  const [formData, setFormData] = useState({
      city: '',
  })

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setFormData({ ...formData, [e.target.name] : e.target.value});
  };
  
  const DF_Temp = [];
  const P_Temp = [];

  const DF_Wind = [];
  const P_Wind = [];

  const DF_Humi = [];
  const P_Humi = [];

  const DF_Pres = [];
  const P_Pres = [];

  const T = [];
  const W = [];
  const H = [];
  const P = [];

  const [message1, setMessage1] = useState([]);
  const [message2, setMessage2] = useState([]);
  const [message3, setMessage3] = useState([]);
  const [message4, setMessage4] = useState([]);
  const [message5, setMessage5] = useState([]);
  const [message6, setMessage6] = useState([]);
  const [message7, setMessage7] = useState([]);
  const [message8, setMessage8] = useState([]);
  const [t, setT] = useState([]);
  const [w, setW] = useState([]);
  const [h, setH] = useState([]);
  const [p, setP] = useState([]);

  const handleSearch = async () => {
    if (city !== "") {
      getWeatherByCity();
    
      try {
        const response = await fetch('http://localhost:8000/forecast/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        
        for (let i=0; i < data.DF_Temp.length; i++){
            DF_Temp.push(data.DF_Temp[i]);
            P_Temp.push(null);

            DF_Wind.push(data.DF_Wind[i]);
            P_Wind.push(null);

            DF_Humi.push(data.DF_Humi[i]);
            P_Humi.push(null);

            DF_Pres.push(data.DF_Pres[i]);
            P_Pres.push(null);
        }

        for (let i=0; i < data.P_Temp.length; i++){
            DF_Temp.push(null);
            P_Temp.push(data.P_Temp[i]);
            
            DF_Wind.push(null);
            P_Wind.push(data.P_Wind[i]);
            
            DF_Humi.push(null);
            P_Humi.push(data.P_Humi[i]);
            
            DF_Pres.push(null);
            P_Pres.push(data.P_Pres[i]);
        }
        
        var T1=0;
        var W1=0;
        var H1=0;
        var P1=0;

        for (let i=280; i < 287; i++){
          T1+=P_Temp[i];
          W1+=P_Wind[i];
          H1+=P_Humi[i];
          P1+=P_Pres[i];
        }

        const T2=T1/8;
        const W2=W1/8;
        const H2=H1/8;
        const P2=P1/8;

        T.push(T2);
        W.push(W2);
        H.push(H2);
        P.push(P2);

        setT(T);
        setW(W);
        setH(H);
        setP(P);

        console.log(T);
        console.log(W);
        console.log(H);
        console.log(P);


        setMessage1(DF_Temp);
        setMessage2(P_Temp);
        setMessage3(DF_Wind);
        setMessage4(P_Wind);
        setMessage5(DF_Humi);
        setMessage6(P_Humi);
        setMessage7(DF_Pres);
        setMessage8(P_Pres);

        setShowWeather(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        setShowWeather(true);
      }

    }
  };

  useEffect(() => {
    handleGetLocation(); // Automatically get weather when component mounts
  }, []);

  const [loading, setLoading] = useState(true);

  // Simulate loading (you can replace this with your actual loading logic)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 3-second loading time
  }, []);

  const options1 = {
    chart: {
      id: "Dynamic-Color-Line",
      background: '#bcb5ad',
    },
    xaxis: {
      categories: Array.from({ length: 280 }, (_, index) => index.toString()), // Assuming 29 data points// Assuming 29 data points
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Temperature',
      },
      labels: {
        style: {
          colors: '#000', // Set the color of x-axis labels
          fontSize: '12px', // Set the font size of x-axis labels
        },
      },
    },
    stroke: {
      width: 4, 
      curve: "smooth", 
    },
  };
  const options2 = {
    chart: {
      id: "Dynamic-Color-Line",
      background: '#bcb5ad',
    },
    xaxis: {
      categories: Array.from({ length: 280 }, (_, index) => index.toString()), // Assuming 29 data points// Assuming 29 data points
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Wind Speed',
      },
      labels: {
        style: {
          colors: '#000', // Set the color of x-axis labels
          fontSize: '12px', // Set the font size of x-axis labels
        },
      },
    },
    stroke: {
      width: 4, 
      curve: "smooth", 
    },
  };
  const options3 = {
    chart: {
      id: "Dynamic-Color-Line",
      background: '#bcb5ad',
    },
    xaxis: {
      categories: Array.from({ length: 280 }, (_, index) => index.toString()), // Assuming 29 data points// Assuming 29 data points
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Humidity',
      },
      labels: {
        style: {
          colors: '#000', // Set the color of x-axis labels
          fontSize: '12px', // Set the font size of x-axis labels
        },
      },
    },
    stroke: {
      width: 4, 
      curve: "smooth", 
    },
  };
  const options4 = {
    chart: {
      id: "Dynamic-Color-Line",
      background: '#bcb5ad',
      width:'100%',
    },
    xaxis: {
      categories: Array.from({ length: 280 }, (_, index) => index.toString()), // Assuming 29 data points// Assuming 29 data points
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Pressure',
      },
      labels: {
        style: {
          colors: '#000', // Set the color of x-axis labels
          fontSize: '12px', // Set the font size of x-axis labels
        },
      },
    },
    stroke: {
      width: 4, 
      curve: "smooth", 
    },
  };


  const generateData1 = () => {
    const seriesData = [];

    seriesData.push({
      name: "Temperature",
      data: message1,
      color: "#FF0000",
    });
  
    seriesData.push({
      name: "ARIMA Predictions",
      data: message2,
      color: "#FFFF00",
    });

    return seriesData;
  };

  const generateData2 = () => {
    const seriesData = [];

    seriesData.push({
      name: "WindSpeed",
      data: message3,
      color: "#FF0000",
    });
  
    seriesData.push({
      name: "ARIMA Predictions",
      data: message4,
      color: "#FFFF00",
    });

    return seriesData;
  };

  const generateData3 = () => {
    const seriesData = [];

    seriesData.push({
      name: "Humidity",
      data: message5,
      color: "#FF0000",
    });
  
    seriesData.push({
      name: "ARIMA Predictions",
      data: message6,
      color: "#FFFF00",
    });

    return seriesData;
  };

  const generateData4 = () => {
    const seriesData = [];

    seriesData.push({
      name: "Pressure",
      data: message7,
      color: "#FF0000",
    });
  
    seriesData.push({
      name: "ARIMA Predictions",
      data: message8,
      color: "#FFFF00",
    });

    return seriesData;
  };

  const series1 = generateData1();
  const series2 = generateData2();
  const series3 = generateData3();
  const series4 = generateData4();

  // console.log(series1);
  // console.log(series2);
  // console.log(series3);
  // console.log(series4);
  const username = 'false';
  return (
    <>
      {loading && <Loading />}
      <Navbar  />
      <div
        className={`weather-box ${
          weather && showWeather && weather.weather[0].main
        }`}
      >
        <h1>Search any location</h1>

        <input
                type="text"
                placeholder="Enter city"
                name="city"
                value={formData.city}
                onChange={handleCityChange}
        />

        <button onClick={handleSearch}>Search</button>

        {error && <div className="error-message">{error}</div>}

        {suggestedCities.length > 0 && (
          <div className="suggested-cities">
            <p>Suggested cities:</p>
            <ul>
              {suggestedCities.map((city, index) => (
                <li key={index}>{city}</li>
              ))}
            </ul>
          </div>
        )}

        <div id="map-container" ref={mapRef}></div>

        {showWeather && weather && (
          <div className="Weather">
            <h2>{weather.name}</h2>
            <p className="">{weather.weather[0].description}</p>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)} °C</p>
            <p>Wind Speed: {Math.round(weather.wind.speed*3.6)} kmph </p>
            <p>Pressure: {Math.round(weather.main.pressure*0.1)} kPa</p>
            <p>Mean Predicted Temperature: <b>{Math.round(t)}°C</b> </p>
             <p>Mean Predicted Wind Speed: <b>{Math.round(w)}kmph</b></p>
             <p>Mean Predicted Humidity: <b>{Math.round(h)}%</b></p>
            <p>Mean Predicted Pressure: <b>{Math.round(p*0.1)} kPa</b></p>

          
          
          </div>
        )}
      </div>

      {showWeather && weather && (
      <div className="Chart">
        {series1.length > 0 && <Chart options={options1} series={series1} type="line" height={350} width={1250} />}
        {series2.length > 0 && <Chart options={options2} series={series2} type="line" height={350} width={1250} />}
        {series3.length > 0 && <Chart options={options3} series={series3} type="line" height={350} width={1250} />}
        {series4.length > 0 && <Chart options={options4} series={series4} type="line" height={350} width={1250} />}
      </div>
    )}

      <Footer1 />
    </>
  );
};

export default Weatherbg;
