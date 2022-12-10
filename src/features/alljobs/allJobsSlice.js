import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axious";
import {
  getAllJobsThunk,
  showStatsThunk,
  showMonthlyApplicationsThunk,
} from "./allJobsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: [],
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk);
export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);
export const showMonthlyApplications = createAsyncThunk(
  "allJobs/showMonthlyApplications",
  showMonthlyApplicationsThunk
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    increasePageValueByOne: (state) => {
      state.page++;
    },
    decreasePageValueByOne: (state) => {
      state.page--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        const { jobs, totalJobs, numOfPages } = payload.data;
        state.isLoading = false;
        state.jobs = jobs;
        state.totalJobs = totalJobs;
        state.numOfPages = numOfPages;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        const { stats } = payload.data;
        state.isLoading = false;
        state.stats = stats;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showMonthlyApplications.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(showMonthlyApplications.fulfilled, (state, { payload }) => {
        const { stats } = payload.data;
        state.isLoading = false;
        state.monthlyApplications = stats;
      })
      .addCase(showMonthlyApplications.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  increasePageValueByOne,
  decreasePageValueByOne,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
