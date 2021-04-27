import Now from "./Now";

const Weekley = ({ data }) => {
  return (
    <>
      {data.map((dataDaily, index) => (
        <Now key={index} data={dataDaily} />
      ))}
    </>
  );
};

export default Weekley;
