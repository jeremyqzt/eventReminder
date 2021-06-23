import { EventEnum, DateTypeEnum, DefaultTheme, ColorMode } from "./constants";

export const constGetNextOccurence = (date) => {
  const today = new Date();

  if (today === date) {
    return 0;
  }

  if (date > today){
    const diffTime = Math.abs(date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  }

    const nextEvent = new Date(date.getFullYear() + 1, date.getFullMonth(), date.getDate());
    const diffTime = Math.abs(nextEvent - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;

}

export const getEvents = () => {
  return EventEnum;
};

export const getDateTypes = () => {
  return DateTypeEnum;
};

export const getTheme = () => {
  return DefaultTheme;
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

export const getColorMode = () => {
  return ColorMode.normal;
};
