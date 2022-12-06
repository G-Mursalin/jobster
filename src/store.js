import { configureStore } from "@reduxjs/toolkit";
import jobSliceReducer from "./features/job/jobSlice";
import userSliceReducer from "./features/user/userSlice";
import allJobsSliceReducer from "./features/alljobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    job: jobSliceReducer,
    allJobs: allJobsSliceReducer,
  },
});
