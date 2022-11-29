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

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const response = await customFetch.delete(`/api/v1/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      console.log(response);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const response = await customFetch.patch(`/api/v1/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return response.data;
    } catch (error) {
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
