import { createSlice } from "@reduxjs/toolkit";
import { CombinedStatus } from "../../../model";

const initialState: CombinedStatus = "";

const status = createSlice({
    name:"status",
    initialState,
    reducers:{
        setStatus: (state, action) => action.payload
    }
})

export const { setStatus } = status.actions;
export default status.reducer