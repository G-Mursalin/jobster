// React
import React from "react";
// React Icons
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
// CSS
import Wrapper from "../assets/wrappers/PageBtnContainer";
// React-Redux
import { useSelector, useDispatch } from "react-redux";
import {
  changePage,
  increasePageValueByOne,
  decreasePageValueByOne,
} from "../features/alljobs/allJobsSlice";
import { getAllJobs } from "../features/alljobs/allJobsSlice";

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const nextPage = () => {
    if (page === numOfPages) return;
    dispatch(increasePageValueByOne());
    dispatch(getAllJobs());
  };
  const prevPage = () => {
    if (page === 1) return;
    dispatch(decreasePageValueByOne());
    dispatch(getAllJobs());
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => {
                dispatch(changePage(pageNumber));
                dispatch(getAllJobs());
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
