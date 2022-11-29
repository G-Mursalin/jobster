// Redux Toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// React Tostify
import { toast } from "react-toastify";
// Utils
import customFetch from "../utils/axious";
import { getUserFromLocalStorage } from "./../utils/localStorage";
// UserSlice
import { logoutUser } from "./userSlice";
// JobSlice
import { showLoading, hideLoading, getAllJobs } from "./allJobsSlice";

export const createAjob = createAsyncThunk(
  "job/createAjob",
  async (job, thunkAPI) => {
    try {
      const response = await customFetch.post("/api/v1/jobs/add-job", job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized. Logging Out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: (state) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAjob.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(createAjob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Job created successfully");
      })
      .addCase(createAjob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
