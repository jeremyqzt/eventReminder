// Imports: Dependencies
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";

// Imports: Screens
import Tabs from "./Tabs";
// Imports: Redux Persist Persister
import { store, persistor } from "./store/store";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// React Native: App
export default function App() {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <Tabs />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
