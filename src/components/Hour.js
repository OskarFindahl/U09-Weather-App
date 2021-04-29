import Moment from "react-moment";

const Hour = ({ data, tempFSet }) => {
  return (
    <div className="weatherbox-small">
      <div className="dataContainerSmall">
        <h3>
          <Moment className="text2" format="ddd HH">
            {data.dt * 1000}
          </Moment>
        </h3>

        <h3>
          {tempFSet === "false"
            ? `${Math.round(data.temp)}\xB0C`
            : `${Math.round(data.temp * 1.8 + 32)}\xB0F`}
        </h3>

        <div className="icon">
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
      </div>
      <h3>{data.weather[0].description}</h3>
    </div>
  );
};

export default Hour;
