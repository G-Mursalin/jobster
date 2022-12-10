import customFetch from "../../utils/axious";

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { searchStatus, searchType, sort, page } = thunkAPI.getState().allJobs;
  let url = `/api/v1/jobs?jobType=${searchType}&status=${searchStatus}&sort=${sort}&page=${page}`;

  try {
    const response = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/v1/jobs/get-stats", {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const showMonthlyApplicationsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/v1/jobs/get-monthly-stats", {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
