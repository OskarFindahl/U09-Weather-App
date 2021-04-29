import Moment from "react-moment";

const Overview = ({ data, tempFSet }) => {
  return (
    <div className="weatherbox-small">
      <div className="dataContainerSmall">
        <h3>
          <Moment className="text2" format="dddd">
            {data.dt * 1000}
          </Moment>
        </h3>

        <h3>
          {tempFSet === "false"
            ? `${Math.round(data.temp.day)}\xB0C`
            : `${Math.round(data.temp.day * 1.8 + 32)}\xB0F`}
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

export default Overview;
