import {
  EventEnum,
  DateTypeEnum,
  DefaultTheme,
  ColorMode,
  AvailableReoccurences,
  EventTypes,
} from "./constants";

import moment from "moment";
import "moment-lunar";

export const getEqualGregorianDate = (lunarDate) => {
  return moment()
    .year(lunarDate.getFullYear())
    .month(lunarDate.getMonth())
    .date(lunarDate.getDate())
    .solar()
    .toDate();
};

export const getEqualLunarDate = (date) => {
  return moment()
    .year(date.getFullYear())
    .month(date.getMonth())
    .date(date.getDate())
    .lunar()
    .toDate();
};

const getNextNoReoccur = (date, dateType) => {
  const today = new Date();

  if (dateType === EventTypes.lunar) {
    const equalGregorian = getEqualGregorianDate(date);
  } else if (dateType === EventTypes.gregorian) {
    if (today < date) {
      return null;
    } else {
      return date;
    }
  }
};

export const getNextOccurence = (date, reoccurType, eventType) => {
  let ret = null;

  // Case 1, Does not reoccur
  switch (reoccurType) {
    case AvailableReoccurences[0].value: {
      ret = getNextNoOccur(date, dateType);
      break;
    }
  }
};

export const GetNextOccurence = (date, reoccurType) => {
  const today = new Date();

  if (today === date) {
    return 0;
  }

  if (date > today) {
    const diffTime = Math.abs(date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  let nextEvent;
  switch (reoccurType) {
    case AvailableReoccurences[0].value: {
      //impossible
      break;
    }
    case AvailableReoccurences[1].value: {
      //Monthly
      nextEvent = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      break;
    }
    case AvailableReoccurences[2].value: {
      //Yearly
      nextEvent = new Date(
        today.getFullYear() + 1,
        today.getMonth(),
        today.getDate()
      );
      break;
    }
  }

  const diffTime = Math.abs(nextEvent - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

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

export const getColorMode = () => {
  return ColorMode.normal;
};
