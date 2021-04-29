import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Now from "./components/Now";
import Weekley from "./components/Weekley";
import Hourly from "./components/Hourly";
import Overviews from "./components/Overviews";

function App() {
  const [state, setState] = useState("No Weather To Show");
  const [data, setData] = useState();
  const [dataEveryThirdHour, setDataEveryThirdHour] = useState();
  const [dataFiveDays, setDataFiveDays] = useState();
  const [tempFSet, setTempFSet] = useState("false");

  //Retrive and wait for position data, then fetch API data
  useEffect(() => {
    getPosition()
      .then((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch((err) => {
        setState(err.message);
      });
  }, []);

  //To get user coordinates
  const getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  //To get weather data
  const getWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const data = await api_call.json();

    //Filter data to get every third hour
    const dataThirdHour = data.hourly.filter(
      (data, index) => !(index % 3) && index < 24
    );

    //Filter data to get only five days
    const dataFiveDays = data.daily.filter((data, index) => index < 5);

    setData(data);
    setDataEveryThirdHour(dataThirdHour);
    setDataFiveDays(dataFiveDays);
  };

  //Function to switch between temp C and F
  const toggleTemp = () => {
    tempFSet === "false" ? setTempFSet("true") : setTempFSet("false");
  };

  return (
    <div className="background">
      <Router>
        <Route exact path="/">
          <Redirect to="/overview" />
        </Route>
        <div className="dataContainer">
          <Link className="upper-nav-button" to="/overview">
            {" "}
            Overview
          </Link>

          <div className="upper-nav-button" onClick={toggleTemp}>
            Toggle temp
          </div>
        </div>
        <div className="multi-button">
          <Link className="nav-button" to="/now">
            Now
          </Link>
          <Link className="nav-button" to="/hour">
            Hourly
          </Link>
          <Link className="nav-button" to="/week">
            Five days
          </Link>
        </div>

        <Route
          path="/overview"
          render={(props) => (
            <>
              {data ? (
                <Overviews data={data} tempFSet={tempFSet} />
              ) : (
                <h3 className="dataContainer">{state}</h3>
              )}
            </>
          )}
        />

        <Route
          path="/now"
          render={(props) => (
            <>
              {data ? (
                <Now data={data.current} tempFSet={tempFSet} />
              ) : (
                <h3 className="dataContainer">{state}</h3>
              )}
            </>
          )}
        />

        <Route
          path="/week"
          render={(props) => (
            <>
              {dataFiveDays ? (
                <Weekley data={dataFiveDays} tempFSet={tempFSet} />
              ) : (
                <h3 className="dataContainer">{state}</h3>
              )}
            </>
          )}
        />

        <Route
          path="/hour"
          render={(props) => (
            <>
              {dataEveryThirdHour ? (
                <Hourly data={dataEveryThirdHour} tempFSet={tempFSet} />
              ) : (
                <h3 className="dataContainer">{state}</h3>
              )}
            </>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
