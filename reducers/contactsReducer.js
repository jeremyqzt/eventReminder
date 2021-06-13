import "react-native-get-random-values";
import { combineReducers } from "redux";

const initial = {
  contact1: {
    id: "contact1",
    firstName: "",
    lastName: "",
    description: "",
    notes: [],
  },
};

const initialIds = ["contact1"];

const addContactEntry = (state, action) => {
  const { contact } = action;
  const { id, firstName, lastName, description } = contact;

  const newContact = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    description: description,
  };

  return {
    ...state,
    [id]: newContact,
  };
};

const updateContactEntry = (state, action) => {
  const { contact } = action;
  const { id, firstName, lastName, description } = contact;

  const newContact = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    description: description,
  };

  return {
    ...state,
    [id]: newContact,
  };
};

const removeContactEntry = (state, action) => {
  const { toRemove } = action;

  const newState = {
    ...state,
  };

  delete newState[toRemove];

  return newState;
};

const allIds = (state = initialIds, action) => {
  switch (action.type) {
    case "ADD_CONTACT": {
      return state.concat(action.contact.id);
    }
    case "UPDATE_CONTACT": {
      return state;
    }
    case "DELETE_CONTACT": {
      return state.filter((item) => item !== action.toRemove);
    }
    default: {
      return state;
    }
  }
};

const byId = (state = initial, action) => {
  switch (action.type) {
    case "ADD_CONTACT": {
      return addContactEntry(state, action);
    }
    case "UPDATE_CONTACT": {
      return updateContactEntry(state, action);
    }
    case "DELETE_CONTACT": {
      return removeContactEntry(state, action);
    }
    default: {
      return state;
    }
  }
};

const contactsReducer = combineReducers({
  allIds: allIds,
  byId: byId,
});

export default contactsReducer;
