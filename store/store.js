import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducers/index";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["settingsReducer", "contactsReducer", "eventsReducer"],
  blacklist: [],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
//const store = createStore(persistedReducer, applyMiddleware(createLogger()));
const store = createStore(persistedReducer);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export { store, persistor };
