// Redux Toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// React Tostify
import { toast } from "react-toastify";
// Utils
import customFetch from "../../utils/axious";
// Job Thunks
import { createAJobThunk, deleteJobThunk, updateJobThunk } from "./jobThunk";

// Async Task Handlers
export const createAjob = createAsyncThunk("job/createAjob", createAJobThunk);
export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);
export const updateJob = createAsyncThunk("job/updateJob", updateJobThunk);

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
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
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
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success("Job deleted successfully");
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(updateJob.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Job updated successfully");
      })
      .addCase(updateJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
