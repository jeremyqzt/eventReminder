import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import contactsReducer from "./contactsReducer";
import eventsReducer from "./eventReducer";

const rootReducer = combineReducers({
  settingsReducer: settingsReducer,
  contactsReducer: contactsReducer,
  eventsReducer: eventsReducer,
});

export default rootReducer;
