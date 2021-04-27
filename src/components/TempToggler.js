import { useState } from "react";

const TempToggler = ({ tempIn }) => {
  const [temp, setTemp] = useState();

  setTemp(tempIn);

  const toggleTemp = () => {
    //temp.search("C") ? console.log("C") : console.log("F");
    console.log(temp);
    setTemp(temp + 1000);
  };

  return (
    <>
      <div onClick={toggleTemp}>{temp}</div>
    </>
  );
};

export default TempToggler;
