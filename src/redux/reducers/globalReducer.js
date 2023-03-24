import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchBar: false,
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    toggleSearchbar: (state, action) => {
      state.searchBar = !state.searchBar;
    },
  },
});
export const { toggleSearchbar } = globalSlice.actions;

export default globalSlice.reducer;
