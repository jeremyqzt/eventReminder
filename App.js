// Imports: Dependencies
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
// Imports: Screens
import Tabs from "./Tabs";
// Imports: Redux Persist Persister
import { store, persistor } from "./store/store";

// React Native: App
export default function App() {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tabs />
      </PersistGate>
    </Provider>
  );
}
