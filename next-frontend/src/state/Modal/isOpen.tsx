import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean  = false;

const isOpen = createSlice({
    name:"isOpen",
    initialState,
    reducers: {
        setIsOpen: (state) => !state
    }
})

export const { setIsOpen } = isOpen.actions

export default isOpen.reducer