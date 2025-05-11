import { createSlice } from "@reduxjs/toolkit";
type Modals = {clipSubmission: boolean, submittedClips: boolean, logout: boolean, profileForm: boolean }
const initialState: Modals  = {clipSubmission: false, submittedClips: false, logout: false, profileForm: false};

const isOpen = createSlice({
    name:"isOpen",
    initialState,
    reducers: {
        setClipSubmission: (state) => {state.clipSubmission = !state.clipSubmission},
        setSubmittedClip: (state) => {state.submittedClips = !state.submittedClips},
        setLogout: (state) => {state.logout = !state.logout},
        setProfileForm: (state) => {state.profileForm = !state.profileForm}
    }
})

export const { setClipSubmission, setSubmittedClip, setLogout, setProfileForm } = isOpen.actions

export default isOpen.reducer