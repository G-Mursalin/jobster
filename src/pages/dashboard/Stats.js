// React
import React, { useEffect } from "react";
// Components
import Loading from "../../components/Loading";
import StatsContainer from "../../components/StatsContainer";
import ChartsContainer from "../../components/ChartsContainer";
// React Redux
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/alljobs/allJobsSlice";
import { showMonthlyApplications } from "../../features/alljobs/allJobsSlice";

const Stats = () => {
  const { isLoading, monthlyApplications, stats } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
    dispatch(showMonthlyApplications());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <React.Fragment>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </React.Fragment>
  );
};

export default Stats;
