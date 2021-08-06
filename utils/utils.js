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

export const formatDate = (date) => {
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const getNextMonthOccurence = (date, today) => {
  const wouldBeThisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    date.getDate()
  );

  if (wouldBeThisMonth === today) {
    return today;
  }

  if (wouldBeThisMonth < today) {
    return new Date(today.getFullYear(), today.getMonth() + 1, date.getDate());
  }

  if (wouldBeThisMonth > today) {
    return wouldBeThisMonth;
  }
};

const getNextYearOccurence = (date, today) => {
  const wouldBeThisYear = new Date(
    today.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (wouldBeThisYear === today) {
    return today;
  }

  if (wouldBeThisYear < today) {
    return new Date(today.getFullYear() + 1, date.getMonth(), date.getDate());
  }

  if (wouldBeThisYear > today) {
    return wouldBeThisYear;
  }
};

export const getNextOccurence = (date, reoccurType, today) => {
  let ret = null;

  switch (reoccurType) {
    // Case 1, Does not reoccur
    case AvailableReoccurences[0].value: {
      ret = date;
      break;
    }
    // Case 2, Monthly
    case AvailableReoccurences[1].value: {
      ret = getNextMonthOccurence(date, today);
      break;
    }
    // Case 3, Yearly
    case AvailableReoccurences[2].value: {
      ret = getNextYearOccurence(date, today);
      break;
    }
  }

  return ret;
};

export const getDifferenceFromToday = (date) => {
  const today = new Date();
  if (today === date) {
    return 0;
  }

  if (date > today) {
    const diffTime = Math.abs(date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return -1;
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
