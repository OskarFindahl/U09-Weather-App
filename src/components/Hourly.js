import Now from "./Now";

const Hourly = ({ data }) => {
  return (
    <>
      {data.map((dataHourly, index) => (
        <Now key={index} data={dataHourly} />
      ))}
    </>
  );
};

export default Hourly;
