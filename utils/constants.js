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

export const defaultContact = Object.freeze({
  firstName: "",
  lastName: "",
  description: "",
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

export const AvailableIcons = [
  {
    label: "Calendar",
    value: "calendar",
  },
  {
    label: "Heart",
    value: "heart",
  },
  {
    label: "Present",
    value: "gift",
  },
  {
    label: "Cake",
    value: "birthday-cake",
  },
  {
    label: "Flag",
    value: "flag",
  },
  {
    label: "Plane",
    value: "plane",
  },
  {
    label: "Therometer",
    value: "therometer",
  },
  {
    label: "Moon",
    value: "moon-o",
  },
  {
    label: "Diamond",
    value: "diamond",
  },
];

export const OccurenceTypes = Object.freeze({
  never: 0,
  monthly: 1,
  yearly: 2,
});

export const EventTypes = Object.freeze({
  lunar: 0,
  gregorian: 1,
});

export const AvailableReoccurences = [
  {
    label: "Once",
    value: OccurenceTypes.never,
    indicator: "↖️",
  },
  {
    label: "Monthly",
    value: OccurenceTypes.monthly,
    indicator: "🔃",
  },
  {
    label: "Yearly",
    value: OccurenceTypes.yearly,
    indicator: "🔄",
  },
];

export const EventType = [
  {
    label: "Lunar",
    value: EventTypes.lunar,
    indicator: "🌑",
  },
  {
    label: "Gregorian",
    value: EventTypes.gregorian,
    indicator: "📅",
  },
];

export const AvailableColors = [
  {
    label: "Dark",
    value: "#000000",
  },
  {
    label: "Lilac",
    value: "#EA80FC",
  },
  {
    label: "Sky Blue",
    value: "#6495ed",
  },
  {
    label: "Tangerine",
    value: "#ff7f50",
  },
  {
    label: "Cyan",
    value: "#7fffd4",
  },
  {
    label: "Grass",
    value: "#8fbc8f",
  },
  {
    label: "Gold",
    value: "#ffd700",
  },
  {
    label: "Red",
    value: "red",
  },
];

export const Everyone = {
  label: "Everyone",
  value: "0-0-0-0",
};

export const defaultEvent = Object.freeze({
  eventName: "Event Name (E.g. 🥮 Moon Festival)",
  color: AvailableColors[0].value,
  icon: AvailableIcons[0].value,
  contacts: [{ ...Everyone }],
  reoccurence: AvailableReoccurences[2].value,
  notes: "",
  type: EventType[1].value,
  year: "2020",
  month: "0",
  day: "1",
});
