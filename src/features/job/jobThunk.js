// Utils
import customFetch from "../../utils/axious";
// UserSlice
import { logoutUser } from "../user/userSlice";
// JobSlice
import { showLoading, hideLoading, getAllJobs } from "../alljobs/allJobsSlice";
import { clearValues } from "./jobSlice";

// Thunks Functions
export const createAJobThunk = async (job, thunkAPI) => {
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
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
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
};

export const updateJobThunk = async ({ jobId, job }, thunkAPI) => {
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
};
