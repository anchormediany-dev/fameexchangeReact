// import { configureStore } from "@reduxjs/toolkit";
// import { api } from "./api";
// import authReducer from "../features/auth/authSlice";
// import signupModalReducer from "../features/auth/signupModalSlice";
// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     auth: authReducer,
//     signupModal: signupModalReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import { api } from "./api";
import authReducer from "../features/auth/authSlice";
import signupModalReducer from "../features/auth/signupModalSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";

// Persist ONLY checkout.billing using a transform
const billingOnlyTransform = createTransform(
  (inboundState, key) => {
    if (key === "checkout") {
      return { billing: inboundState.billing }; // keep only billing in storage
    }
    return inboundState;
  },
  (outboundState) => outboundState
);

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  signupModal: signupModalReducer,
  checkout: checkoutReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["checkout"], // only persist checkout slice
  transforms: [billingOnlyTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, // silence redux-persist warnings
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
