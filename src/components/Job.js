// React
import React from "react";
// React Icons
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
// React Router
import { Link } from "react-router-dom";
// CSS
import Wrapper from "../assets/wrappers/Job";
// React Redux
import { useDispatch } from "react-redux";
import JobInfo from "./JobInfo";
import { deleteJob, setEditJob } from "../features/jobSlice";

const Job = (props) => {
  const { _id, position, company, jobLocation, jobType, createAt, status } =
    props;
  const dispatch = useDispatch();
  const date = createAt;

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={new Date(createAt).toLocaleDateString("en-GB")}
          />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                dispatch(deleteJob(_id));
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
