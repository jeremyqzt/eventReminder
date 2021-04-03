import { defaultContact } from "../utils/constants";

const initial = {
  contacts: [defaultContact],
};

const contactsReducer = (state = initial, action) => {
  switch (action.type) {
    case "ADD_CONTACT": {
      return {
        contacts: [...state.contacts, action.contacts],
      };
    }
    default: {
      return state;
    }
  }
};

export default contactsReducer;
