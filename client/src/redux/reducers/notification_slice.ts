import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    success: (state, action) => {
      return toast.success(action.payload);
    },
    error: (state, action) => {
      return toast.error(action.payload);
    },
    set_search: (state, action) => {
      
    }
  },
});

export const { success, error } = notificationSlice.actions;

export default notificationSlice.reducer;