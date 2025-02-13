import { createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../../model";
import thumbnail from "../../assets/images/thumbnail.png";

const initialState: Profile = {
    id: 1,
    role: "creator",
    name: "",
    city: "",
    country: "",
    brand_name: "",
    brandImage: thumbnail,
    socialMediaHandles: [
      { platform: "Instagram", handle: "" },
    ],
    email: "",
    engagementImages: [thumbnail],
    niche: "",
    guidelines: [
      ""],
    followers: 0,
    pricePerPost: 0,
}
;

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => action.payload
    }
})

export const { setUser } = user.actions;
export default user.reducer;