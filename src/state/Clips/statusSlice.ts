import { createSlice } from "@reduxjs/toolkit";
import { ClipStatus } from "./clipsSlice";

const initialState: ClipStatus | null = null;

const statusSlice = createSlice({
  name: "status",
  initialState: initialState,
  reducers: {
    setStatus: (state: ClipStatus | null, action) => {
      return action.payload;
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
