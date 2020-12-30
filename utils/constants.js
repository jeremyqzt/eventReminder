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
  ],
  placeHolder: {
    value: 0,
    label: "Select event...",
  },
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
      icon: "🌅",
      label: "🌅Solar",
    },
  ],
  placeHolder: {
    value: 0,
    label: "Select type...",
  },
});

export const defaultTheme = {
  primary: "#3D85C6",
  secondary: "#9EC2E3",
  tertiary: "#CBBDFF",

  colorful: ["#A4DEF9", "#CFBAE1", "#97F9F9"],

  heading1: "black",
  heading2: "grey",
  text: "text",
  cancel: "#A9A9A9",
};
