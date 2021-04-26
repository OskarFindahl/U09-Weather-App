import "./App.css";
import { useState, useEffect } from "react";
import React, { Component } from "react";
import Moment from "react-moment";

function App() {
  const [state, setState] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [tempC, setTempC] = useState();
  const [tempF, setTempF] = useState();
  const [temp, setTemp] = useState();
  const [tempLabel, setTempLabel] = useState("\xB0" + "C");
  const [humidity, setHumidity] = useState();
  const [windspeed, setWindspeed] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [icon, setIcon] = useState();

  useEffect(() => {
    getPosition()
      .then((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch((err) => {
        setState({ errorMessage: err.message });
      });
  }, []);

  const getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const data = await api_call.json();

    setLat(latitude);
    setLon(longitude);
    setTempC(data.current.temp);
    setTempF(data.current.temp * 1.8 + 32);
    setTemp(data.current.temp);
    setHumidity(data.current.humidity);
    setWindspeed(data.current.wind_speed);
    setSunrise(data.current.sunrise * 1000);
    setSunset(data.current.sunset * 1000);
    setIcon(data.current.weather[0].icon);
  };

  const toggleTemp = () => {
    temp !== tempF ? setTemp(tempF) : setTemp(tempC);
    temp !== tempF ? setTempLabel("\xB0" + "F") : setTempLabel("\xB0" + "C");
  };

  return (
    <div className="weatherbox">
      <div onClick={toggleTemp} className="text1">
        {temp}
        {tempLabel}
      </div>
      <div className="icon">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt="weather icon"
        />
      </div>
      <div className="text2">
        Humidity: {humidity} %
        <br />
        Wind: {windspeed} m/s
        <br />
        Sunrise: <Moment format="H:mm">{sunrise}</Moment>
        <br />
        Sunset: <Moment format="H:mm ">{sunset}</Moment>
      </div>
    </div>
  );
}

export default App;
