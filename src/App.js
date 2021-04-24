import "./App.css";
import { useState, useEffect } from "react";
import React, { Component } from "react";

function App() {
  const [state, setState] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [temperatureC, setTemperatureC] = useState();

  const getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const data = await api_call.json();

    setLat(latitude);
    setLon(longitude);
    setTemperatureC(Math.round(data.current.temp));
  };

  useEffect(() => {
    getPosition()
      .then((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch((err) => {
        setState({ errorMessage: err.message });
      });
  }, []);

  return (
    <div>
      {lat}
      <br />
      {temperatureC}
    </div>
  );
}

export default App;
