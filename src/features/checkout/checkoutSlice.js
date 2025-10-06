import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Persisted:
  billing: {
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  },

  // Not persisted (transient):
  attendees: [{ firstName: "", lastName: "", phone: "", email: "" }],
  paymentIntent: null,
  paymentResult: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setBillingField: (state, { payload }) => {
      state.billing[payload.field] = payload.value;
    },
    setBillingAddressField: (state, { payload }) => {
      state.billing.address[payload.field] = payload.value;
    },
    setAttendees: (state, { payload }) => {
      state.attendees = payload;
    },
    setPaymentIntent: (state, { payload }) => {
      state.paymentIntent = payload;
    },
    setPaymentResult: (state, { payload }) => {
      state.paymentResult = payload;
    },
    resetBilling: (state) => {
      state.billing = initialState.billing;
    },
    resetCheckoutTransient: (state) => {
      state.attendees = initialState.attendees;
      state.paymentIntent = null;
      state.paymentResult = null;
    },
  },
});

export const {
  setBillingField,
  setBillingAddressField,
  setAttendees,
  setPaymentIntent,
  setPaymentResult,
  resetBilling,
  resetCheckoutTransient,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
