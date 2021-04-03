import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import contactsReducer from "./contactsReducer";

const rootReducer = combineReducers({
  settingsReducer: settingsReducer,
  contactsReducer: contactsReducer,
});

export default rootReducer;
