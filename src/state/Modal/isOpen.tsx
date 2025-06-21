import { createSlice } from "@reduxjs/toolkit";
type Modals = {
  clipSubmission: boolean;
  submittedClips: boolean;
  logout: boolean;
  profileForm: boolean;
  forgotPassword: boolean;
};
const initialState: Modals = {
  clipSubmission: false,
  submittedClips: false,
  logout: false,
  profileForm: false,
  forgotPassword: false,
};

const isOpen = createSlice({
  name: "isOpen",
  initialState,
  reducers: {
    setClipSubmission: (state) => {
      state.clipSubmission = !state.clipSubmission;
    },
    setSubmittedClip: (state) => {
      state.submittedClips = !state.submittedClips;
    },
    setLogout: (state) => {
      state.logout = !state.logout;
    },
    setProfileForm: (state) => {
      state.profileForm = !state.profileForm;
    },
    setForgotPassword: (state) => {
      state.forgotPassword = !state.forgotPassword;
    },
  },
});

export const {
  setClipSubmission,
  setSubmittedClip,
  setLogout,
  setProfileForm,
  setForgotPassword,
} = isOpen.actions;

export default isOpen.reducer;
