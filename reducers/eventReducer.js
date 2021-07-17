import "react-native-get-random-values";
import { combineReducers } from "redux";
import { defaultEvent } from "../utils/constants";

const initial = {
  event: {
    ...defaultEvent,
  },
};

const initialIds = [];

const addOrEditEventEntry = (state, action) => {
  const { event } = action;
  const { id, eventName, color, icon, contacts, reoccurence, notes, type } =
    event;

  const newEvent = {
    id,
    eventName,
    color,
    icon,
    contacts,
    reoccurence,
    notes,
    type,
  };

  return {
    ...state,
    [id]: newEvent,
  };
};

const removeEventEntry = (state, action) => {
  const { toRemove } = action;

  const newState = {
    ...state,
  };

  delete newState[toRemove];

  return newState;
};

const allIds = (state = initialIds, action) => {
  switch (action.type) {
    case "ADD_EVENT": {
      return state.concat(action.event.id);
    }
    case "UPDATE_EVENT": {
      return state;
    }
    case "DELETE_EVENT": {
      return state.filter((item) => item !== action.toRemove);
    }
    default: {
      return state;
    }
  }
};

const byId = (state = initial, action) => {
  switch (action.type) {
    case "ADD_EVENT": {
      return addOrEditEventEntry(state, action);
    }
    case "UPDATE_EVENT": {
      return addOrEditEventEntry(state, action);
    }
    case "DELETE_EVENT": {
      return removeEventEntry(state, action);
    }
    default: {
      return state;
    }
  }
};

const eventsReducer = combineReducers({
  allIds: allIds,
  byId: byId,
});

export default eventsReducer;
