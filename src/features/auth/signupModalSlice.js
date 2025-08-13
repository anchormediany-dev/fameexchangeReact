// features/auth/signupModalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false };

const signupModalSlice = createSlice({
  name: "signupModal",
  initialState,
  reducers: {
    openSignupModal: (state) => {
      state.isOpen = true;
    },
    closeSignupModal: (state) => {
      state.isOpen = false;
    },
    toggleSignupModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSignupModal, closeSignupModal, toggleSignupModal } =
  signupModalSlice.actions;

// ✅ proper selector
export const selectSignupModalOpen = (state) => state.signupModal.isOpen;

export default signupModalSlice.reducer;
