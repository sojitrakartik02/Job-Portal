import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.message = null;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null;
    },
    registerFaild(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = null;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.message = null;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null;
    },
    loginFaild(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = null;
      state.error = action.payload;
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFaild(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
      // state.error = null;
    },
    logoutFaild(state, action) {
      // state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    clearAllError(state) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/job/api/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.registerFaild(error.response.data.message));
    console.log("Error in Register", error);
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/job/api/user/login",
      data,
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      userSlice.actions.loginFaild(
        error.response?.data?.message || "Login Falid"
      )
    );
    console.log("Error in Login", error);
  }
};
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "http://localhost:4000/job/api/user/getUser",

      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      userSlice.actions.fetchUserFaild(
        error.response?.data?.message || "Login Falid"
      )
    );
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/job/api/user/logout",

      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      userSlice.actions.logoutFaild(
        error.response?.data?.message || "Login Falid"
      )
    );
  }
};

export const clearAllUserError = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllError());
};
export default userSlice.reducer;
