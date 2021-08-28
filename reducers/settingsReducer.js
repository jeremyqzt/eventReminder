const initialState = {
  darkMode: false,
  useCalendar: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DARK_MODE": {
      return {
        ...state,
        darkMode: action.darkMode,
      };
    }
    case "USE_CAL": {
      return {
        ...state,
        useCalendar: action.useCalendar,
      };
    }
    default: {
      return state;
    }
  }
};

// Exports
export default settingsReducer;
