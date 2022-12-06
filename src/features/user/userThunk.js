// Utils
import customFetch from "../../utils/axious";
// Userslice
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post("/api/v1/users/signup", user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post("/api/v1/users/login", user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const updateAUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post("/api/v1/users/update-me", user, {
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
