import Moment from "react-moment";

const Week = ({ data, tempFSet }) => {
  return (
    <div className="weatherbox">
      <h2>
        <Moment format="dddd">{data.dt * 1000}</Moment>
      </h2>
      <h2>
        {tempFSet === "false"
          ? `${Math.round(data.temp.day)}\xB0C`
          : `${Math.round(data.temp.day * 1.8 + 32)}\xB0F`}
      </h2>
      <div className="icon">
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
      <div className="dataContainer">
        <h3>{data.weather[0].description}</h3>
      </div>
      <div className="dataContainer">
        <img className="icon2" src="images/humidity.png" alt="wind icon" />
        <h3>{data.humidity}%</h3>
        <img className="icon2" src="images/wind.png" alt="wind icon" />
        <h3>{data.wind_speed}m/s</h3>
        <img className="icon2" src="images/sunrise.png" alt="wind icon" />
        <h3>
          <Moment format="H:mm">{data.sunrise * 1000}</Moment>{" "}
        </h3>
        <img className="icon2" src="images/sunset.png" alt="wind icon" />
        <h3>
          <Moment format="H:mm ">{data.sunset * 1000}</Moment>
        </h3>
      </div>
    </div>
  );
};

export default Week;
