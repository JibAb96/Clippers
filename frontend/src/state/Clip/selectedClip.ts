import { createSlice } from "@reduxjs/toolkit";
import { Clip } from "../../model";

const initialState: Clip = {
  id: 0,
  title: "",
  status: "New Submission",
  user: "",
  platform: "YouTube",
  video: undefined,
  thumbnail: "",
};
const selectedClip = createSlice({
  name: "clip",
  initialState,
  reducers: {
    selectClip: (state, action) => action.payload
  },
});

export const { selectClip } = selectedClip.actions;
export default selectedClip.reducer;