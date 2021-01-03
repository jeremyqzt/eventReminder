import { EventEnum, DateTypeEnum, defaultTheme, DateTypes } from "./constants";

export const getEvents = () => {
  return EventEnum;
};

export const getDateTypes = () => {
  return DateTypeEnum;
};

export const getTheme = () => {
  return defaultTheme;
};

export const getName = (first, last) => {
  if (first) {
    if (last) {
      return `${first} ${last}`;
    }

    return first;
  }

  return undefined;
};

export const getDefaults = () => {
  return {
    description: undefined,
    eventDate: undefined,
    eventValue: 0,
    isLunar: false,
    isReoccuring: true,
  };
};

export const checkValidEvents = (events) => {
  return events.every((item) => {
    return item.eventDate && item.eventValue !== 0;
  });
};

export const checkValidContact = (contact) => {
  return Boolean(contact.firstName);
};
