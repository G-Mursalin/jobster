// React
import React, { useEffect } from "react";
//  CSS
import Wrapper from "../assets/wrappers/JobsContainer";
// React Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../features/alljobs/allJobsSlice";
import { decreasePageValueByOne } from "../features/alljobs/allJobsSlice";
// Components
import Job from "./Job";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { jobs, isLoading, page, totalJobs, numOfPages } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  if (page > numOfPages) {
    dispatch(decreasePageValueByOne());
    dispatch(getAllJobs());
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
