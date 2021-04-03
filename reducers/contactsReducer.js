import { defaultContact } from "../utils/constants";

const initial = {
  contacts: [defaultContact],
};

const contactsReducer = (state = initial, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_CONTACT": {
      return {
        contacts: [...state.contacts, action.contact],
      };
    }
    default: {
      return state;
    }
  }
};

export default contactsReducer;
