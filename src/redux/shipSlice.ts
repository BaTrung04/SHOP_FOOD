import { createSlice } from "@reduxjs/toolkit";

interface IShipState {
  info: [];
}
const initialState: IShipState = {
  info: [],
};

export const shipSlice = createSlice({
  name: "ship",
  initialState,
  reducers: {
    shipInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

const { actions, reducer } = shipSlice;
export const { shipInfo } = actions;

export default reducer;
