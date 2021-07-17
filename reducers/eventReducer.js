import "react-native-get-random-values";
import { combineReducers } from "redux";

const initial = {
  event: {
    id: "event1",
    date: "2021-01-01",
    eventName: "",
    description: "",
    notes: [],
    reoccurs: true,
    notify: false,
    syncCalender: false,
    contacts: [],
  },
};

const initialIds = [];

const addOrEditEventEntry = (state, action) => {
  const { event } = action;
  const {
    id,
    date,
    eventName,
    description,
    notes,
    reoccurs,
    notify,
    syncCalender,
    contacts,
  } = event;

  const newEvent = {
    id: id,
    date,
    eventName,
    description,
    notes,
    reoccurs,
    notify,
    syncCalender,
    contacts,
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
      return state.concat(action.contact.id);
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
