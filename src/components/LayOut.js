"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";

const LayOut = ({ children }) => {
  return (
    <SessionProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>{children}</Provider>
      </PersistGate>
    </SessionProvider>
  );
};

export default LayOut;
