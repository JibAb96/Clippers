import { createSlice } from "@reduxjs/toolkit";

type Search = {
    value: string;
}

const initialState: Search = {
    value: ""
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {state.value = action.payload}
    }
})

export const { setSearch } = searchSlice.actions
export default searchSlice.reducer