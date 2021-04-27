import Moment from "react-moment";

//
const Now = ({ data, tempFSet }) => {
  return (
    <div className="weatherbox">
      <Moment className="text1" format="HH:ddd">
        {data.dt * 1000}
      </Moment>

      <div className="text1">
        {tempFSet === "false"
          ? `${Math.round(data.temp)}\xB0C`
          : `${Math.round(data.temp * 1.8 + 32)}\xB0F`}
      </div>

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
