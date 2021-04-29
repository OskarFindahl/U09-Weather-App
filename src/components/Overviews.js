import Overview from "./Overview";

const Overviews = ({ data, tempFSet }) => {
  return (
    <>
      {data.daily.map((dataDaily, index) => (
        <Overview key={index} data={dataDaily} tempFSet={tempFSet} />
      ))}
    </>
  );
};

export default Overviews;
