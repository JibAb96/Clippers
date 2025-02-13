import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean  = false;

const isSignedIn = createSlice({
    name:"isSignIn",
    initialState,
    reducers: {
        setIsSignedIn: (state) => !state
    }
})

export const { setIsSignedIn } = isSignedIn.actions

export default isSignedIn.reducer