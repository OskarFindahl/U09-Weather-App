import Hour from "./Hour";

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
