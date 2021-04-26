import Now from "./Now";

const Weekley = ({ data }) => {
  //console.log(data.daily);
  return (
    <>
      {data.daily.map((dataDaily, index) => (
        <Now key={index} data={dataDaily} />
      ))}
    </>
  );
};

export default Weekley;
