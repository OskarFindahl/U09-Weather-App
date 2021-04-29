import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Now from "./components/Now";
import Weekley from "./components/Weekley";
import Hourly from "./components/Hourly";
import Overviews from "./components/Overviews";

function App() {
  const [state, setState] = useState();
  const [data, setData] = useState();
  const [dataEveryThirdHour, setDataEveryThirdHour] = useState();
  const [dataFiveDays, setDataFiveDays] = useState();
  const [tempFSet, setTempFSet] = useState("false");

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

    const dataThirdHour = data.hourly.filter(
      (data, index) => !(index % 3) && index < 24
    );

    const dataFiveDays = data.daily.filter((data, index) => index < 5);

    setData(data);
    setDataEveryThirdHour(dataThirdHour);
    setDataFiveDays(dataFiveDays);
  };

  const toggleTemp = () => {
    tempFSet === "false" ? setTempFSet("true") : setTempFSet("false");
    console.log(tempFSet);
  };

  return (
    <div className="background">
      <Router>
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
                "No Weather To Show"
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
                "No Weather To Show"
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
                "No Weather To Show"
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
                "No Weather To Show"
              )}
            </>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
