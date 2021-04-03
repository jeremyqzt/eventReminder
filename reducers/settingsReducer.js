const initialState = {
  darkMode: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DARK_MODE": {
      return {
        ...state,
        darkMode: action.darkMode,
      };
    }
    default: {
      return state;
    }
  }
};

// Exports
export default settingsReducer;
