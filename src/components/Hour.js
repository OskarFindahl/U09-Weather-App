import Moment from "react-moment";

const Hour = ({ data, tempFSet }) => {
  return (
    <div className="weatherbox-small">
      <Moment className="text2" format="ddd HH">
        {data.dt * 1000}
      </Moment>
      <div className="text2">
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
      {/* <div className="text2">Humidity: {data.humidity} % </div>
      <div className="text2"> Wind:{data.wind_speed} m/s</div>
      <div className="text2">
        Sunrise: <Moment format="H:mm">{data.sunrise * 1000}</Moment>
      </div>
      <div className="text2">
        Sunset: <Moment format="H:mm ">{data.sunset * 1000}</Moment>
      </div> */}
    </div>
  );
};

export default Hour;
