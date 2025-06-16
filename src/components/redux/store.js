import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import shoppingReducer from "./shoppingSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, shoppingReducer);

export const store = configureStore({
  reducer: {
    name: persistedReducer,
  },
});
export const persistor = persistStore(store);
