// Redux Toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// React Tostify
import { toast } from "react-toastify";
// Utils
import customFetch from "../utils/axious";

const initialState = {
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post("/api/v1/users/signup", user);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log("Login user:", user);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
