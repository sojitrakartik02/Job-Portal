import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdate: false,
  },
  reducers: {
    updateProfileRequest(state, action) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      (state.loading = false), (state.error = null), (state.isUpdate = true);
    },
    updateProfileFailed(state, action) {
      (state.loading = false),
        (state.error = action.payload),
        (state.isUpdate = false);
    },
    updatePasswordRequest(state, action) {
      state.loading = true;
    },
    updatePasswordSuccess(state, action) {
      (state.loading = false), (state.error = null), (state.isUpdate = true);
    },
    updatePasswordFailed(state, action) {
      (state.loading = false),
        (state.error = action.payload),
        (state.isUpdate = false);
    },
    profileResetAfterUpdate(state, action) {
      (state.error = null), (state.isUpdate = false);
      state.loading = false;
    },
  },
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      `http://localhost:4000/job/api/user/updateProfile`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updateProfileSlice.actions.updateProfileSuccess)();
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updateProfileFailed(
        error.response.data.message || "Falid to update"
      )
    );
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updatePasswordRequest());
  try {
    const response = await axios.put(
      `http://localhost:4000/job/api/user/updatePassword`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "aplication/json" },
      }
    );
    dispatch(updateProfileSlice.actions.updatePasswordSuccess)();
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updatePasswordFailed(
        error.response.data.message || "Falid to update Paasword"
      )
    );
  }
};

export const clearAllUpdateProfileError = () => (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;
