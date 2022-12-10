// React
import React from "react";
// Components
import SearchContainer from "../../components/SearchContainer";
import JobsContainer from "../../components/JobsContainer";

const AllJobs = () => {
  return (
    <React.Fragment>
      <SearchContainer />
      <JobsContainer />
    </React.Fragment>
  );
};

export default AllJobs;
