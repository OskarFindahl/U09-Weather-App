import { Link } from "react-router-dom";
import Moment from "react-moment";

//toggleTemp, tempLabel, temp
const Now = ({ data }) => {
  return (
    <div className="weatherbox">
      {/* <div onClick={toggleTemp} className="text1">
        {temp}
        {tempLabel}
      </div> */}

      <div className="icon">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
      <div className="text2">
        Humidity: {data.humidity} %
        <br />
        Wind: {data.wind_speed} m/s
        <br />
        Sunrise: <Moment format="H:mm">{data.sunrise * 1000}</Moment>
        <br />
        Sunset: <Moment format="H:mm ">{data.sunset * 1000}</Moment>
      </div>
    </div>
  );
};

export default Now;
