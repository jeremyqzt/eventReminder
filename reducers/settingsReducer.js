const initialState = {
  darkMode: false,
  useCalendar: false,
  notifs: false,
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
    case "NOFITICATIONS": {
      return {
        ...state,
        notifs: action.notifs,
      };
    }
    default: {
      return state;
    }
  }
};

// Exports
export default settingsReducer;
