import Hour from "./Hour";
import Now from "./Now";

const Hourly = ({ data, tempFSet }) => {
  return (
    <>
      {data.map((dataHourly, index) => (
        <Hour key={index} data={dataHourly} tempFSet={tempFSet} />
      ))}
    </>
  );
};

export default Hourly;
