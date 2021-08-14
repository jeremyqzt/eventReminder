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

  delete: "#9f0000",
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
    kindaGary: "#D3D3D3",
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
    label: "Microchip",
    value: "microchip",
  },
  {
    label: "Moon",
    value: "moon-o",
  },
  {
    label: "Diamond",
    value: "diamond",
  },
  {
    label: "Bath",
    value: "bath",
  },
  {
    label: "Building",
    value: "bank",
  },
  {
    label: "Battery",
    value: "battery-4",
  },
  {
    label: "Bell",
    value: "bell",
  },
  {
    label: "Bookmark",
    value: "bookmark",
  },
  {
    label: "Lightning",
    value: "bolt",
  },
  {
    label: "Cutlery",
    value: "cutlery",
  },
  {
    label: "Road",
    value: "road",
  },
  {
    label: "Lock",
    value: "unlock",
  },
  {
    label: "Wrench",
    value: "wrench",
  },
  {
    label: "Spinner",
    value: "spinner",
  },
  {
    label: "Magnet",
    value: "magnet",
  },
  {
    label: "Refresh",
    value: "refresh",
  },
  {
    label: "Star",
    value: "star",
  },
  {
    label: "Bitcoin",
    value: "bitcoin",
  },
  {
    label: "Unlink",
    value: "unlink",
  },
  {
    label: "Random",
    value: "random",
  },
  {
    label: "Penguin",
    value: "linux",
  },
  {
    label: "Boxes",
    value: "th",
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
    label: "Grey",
    value: "#D3D3D3",
  },
  {
    label: "Xandu",
    value: "#667761",
  },
  {
    label: "Ruby Brown",
    value: "#b79492",
  },
  {
    label: "Lilac",
    value: "#ea80fc",
  },
  {
    label: "Maximum Blue Purple",
    value: "#B8B8FF",
  },
  {
    label: "Lapis Lazuli",
    value: "#1C5D99",
  },
  {
    label: "Sky Blue",
    value: "#6495ed",
  },
  {
    label: "Blue Sapphire",
    value: "#086788",
  },
  {
    label: "Tangerine",
    value: "#ff7f50",
  },
  {
    label: "Melon",
    value: "#f7af9d",
  },
  {
    label: "Nyanza",
    value: "#E5FFDE",
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
    label: "Silver Sand",
    value: "#bbcbcb",
  },
  {
    label: "Independence",
    value: "#4b4a67",
  },
  {
    label: "Gold",
    value: "#ffd700",
  },
  {
    label: "Brick Red",
    value: "#C14953",
  },
];

export const Everyone = {
  label: "Everyone",
  value: "0-0-0-0",
};

export const defaultEvent = Object.freeze({
  eventName: "🥮 Event Name",
  color: AvailableColors[0].value,
  icon: AvailableIcons[0].value,
  contacts: [Everyone.value],
  reoccurence: AvailableReoccurences[2].value,
  notes: "",
  type: EventType[1].value,
  year: "2020",
  month: "0",
  day: "1",
  acknolwdged: false,
});

export const gregorianHolidays = Object.freeze({
  "2-14": "February 14 is also ❤️ Valentine's Day!",
  "1-1": "January 1 is also 🎆 New Year's Day!",
  "12-25": "December 25 is also 🎁 New Year's Day!",
});

export const lunarHolidays = Object.freeze({
  "1-1": "January 1 is also 🎆 Lunar New Year's Day!",
});
