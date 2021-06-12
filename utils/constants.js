export const EventEnum = Object.freeze({
  events: [
    {
      value: 1,
      name: "Birthday",
      icon: "🎂",
      label: "🎂Birthday",
    },
    {
      value: 2,
      name: "Aniversary",
      icon: "🌹",
      label: "🌹Aniversary",
    },
    {
      value: 3,
      name: "SharedHoliday",
      icon: "🧨",
      label: "🧨Shared Holiday",
    },
    {
      value: 4,
      name: "Other",
      icon: "🎀",
      label: "🎀Other",
    },
    {
      value: 5,
      name: "Single Occurence",
      icon: "1️⃣",
      label: "1️⃣Single Occurence",
    },
  ],
  placeHolder: {
    value: 0,
    label: "Select event...",
  },
});

export const DateTypes = Object.freeze({
  none: 0,
  lunar: 1,
  solar: 2,
});

export const DateTypeEnum = Object.freeze({
  types: [
    {
      value: 1,
      name: "Lunar",
      icon: "🌙",
      label: "🌙Lunar",
    },
    {
      value: 2,
      name: "Solar",
      icon: "🌞",
      label: "🌞Solar",
    },
  ],
  placeHolder: {
    value: 0,
    label: "Select type...",
  },
});

export const defaultEvent = Object.freeze({
  date: "01-01-20",
  dateType: DateTypes.solar,
  eventType: EventEnum.events[0],
  eventName: "Please Enter a Name",
  equivalentSolarDate: "01-01-20",
});

export const defaultContact = Object.freeze({
  firstName: "Enter",
  lastName: "a Name",
  events: [],
});

export const DefaultTheme = {
  primary: "#3D85C6",
  secondary: "#9EC2E3",
  tertiary: "#CBBDFF",

  delete: "#F08080",
  save: "",
  colorful: ["#A4DEF9", "#CFBAE1", "#97F9F9"],

  heading1: "black",
  heading2: "grey",
  text: "text",
  cancel: "#A9A9A9",

  normalMode: {
    main: "white",
    text: "black",
    background: "white",
  },

  darkMode: {
    main: "black",
    text: "white",
    background: "black",

    kindaBlack: "#212121",
    kindaWhite: "#EEEEEE",
  },

  offBlack: "#1a1a1a",
  offWhite: "#f2f2f2",
};

export const ColorMode = Object.freeze({
  normal: 0,
  dark: 1,
});
