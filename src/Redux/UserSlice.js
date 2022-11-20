import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    login:(state, action) => {
      state.user = action.payload
    }
  },
});



export const { login } = UserSlice.actions;
export default UserSlice.reducer;
