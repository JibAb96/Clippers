import { createSlice } from "@reduxjs/toolkit";
import { Clip } from "../../../model";


const initialState: Clip[] = [];

const clips = createSlice({
  name: "clips",
  initialState,
  reducers: {

    filterClips: (state, action) => {
      if (action.payload.status) {
        const tempClips = action.payload.clips.filter(
          (clip: Clip) => clip.status === action.payload.status
        );
        return tempClips.flat();
        
      } else {
       return action.payload.clips;
      }
    },
  },
});

export const { filterClips } = clips.actions;
export default clips.reducer;
