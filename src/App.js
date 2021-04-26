import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Moment from "react-moment";
import Now from "./components/Now";
import Weekley from "./components/Weekley";

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
  const [data, setData] = useState();

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
    setData(data);
  };

  const toggleTemp = () => {
    temp !== tempF ? setTemp(tempF) : setTemp(tempC);
    temp !== tempF ? setTempLabel("\xB0" + "F") : setTempLabel("\xB0" + "C");
  };

  return (
    <Router>
      <Route
        path="/now"
        render={(props) => (
          <>
            {data ? (
              <Now
                data={data.current}
                // toggleTemp={toggleTemp}
                // tempLabel={tempLabel}
                // temp={temp}
              />
            ) : (
              "No Weather To Show"
            )}
          </>
        )}
      />

      <Route
        path="/week"
        render={(props) => (
          <>{data ? <Weekley data={data} /> : "No Weather To Show"}</>
        )}
      />
    </Router>
  );
}

export default App;
