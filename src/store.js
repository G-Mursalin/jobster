import { configureStore } from "@reduxjs/toolkit";
import jobSliceReducer from "./features/jobSlice";
import userSliceReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    job: jobSliceReducer,
  },
});
