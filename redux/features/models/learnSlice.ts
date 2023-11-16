import { createSlice } from "@reduxjs/toolkit";

type LearnState = {
  isWatched: boolean;
  isShow: boolean;
};

const LearnInitialState: LearnState = {
  isWatched: false,
  isShow: false,
};

const learnSlice = createSlice({
  name: "learn",
  initialState: LearnInitialState,
  reducers: {
    setAsWatched(state) {
      state.isWatched = true;
      state.isShow = false;
    },
    openModel(state) {
      state.isShow = true;
    },
    closeModel(state) {
      state.isShow = false;
    },
  },
});

export const { openModel, setAsWatched, closeModel } = learnSlice.actions;
export default learnSlice.reducer;
