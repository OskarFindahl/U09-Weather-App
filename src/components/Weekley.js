import Week from "./Week";

const Weekley = ({ data, tempFSet }) => {
  return (
    <>
      {data.map((dataDaily, index) => (
        <Week key={index} data={dataDaily} tempFSet={tempFSet} />
      ))}
    </>
  );
};

export default Weekley;
