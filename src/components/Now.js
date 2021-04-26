import { Link } from "react-router-dom";
import Moment from "react-moment";

const Now = ({ data, toggleTemp, tempLabel, temp }) => {
  return (
    <div className="weatherbox">
      <div onClick={toggleTemp} className="text1">
        {temp}
        {tempLabel}
      </div>
      <div className="icon">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
      <div className="text2">
        Humidity: {data.current.humidity} %
        <br />
        Wind: {data.current.wind_speed} m/s
        <br />
        Sunrise: <Moment format="H:mm">{data.current.sunrise}</Moment>
        <br />
        Sunset: <Moment format="H:mm ">{data.current.sunset}</Moment>
      </div>
    </div>
  );
};

export default Now;
