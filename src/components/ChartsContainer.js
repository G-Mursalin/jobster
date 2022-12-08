// React
import React from "react";
// React Redux
import { useSelector } from "react-redux";
// Components
import BarChartComponent from "./BarChart";
// CSS
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = () => {
  const { monthlyApplications } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button> Bar Chart</button>
      <BarChartComponent data={monthlyApplications} />
    </Wrapper>
  );
};

export default ChartsContainer;
