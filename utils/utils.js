import {
  EventEnum,
  DateTypeEnum,
  DefaultTheme,
  ColorMode,
  AvailableReoccurences,
} from "./constants";

export const DoINeedToGetNextDate = (date, reoccurType) => {
  const today = new Date();
  let ret = false;

  switch (reoccurType) {
    case AvailableReoccurences[0].value: {
      break;
    }
    case AvailableReoccurences[1].value: {
      //Monthly
      const thisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        date.getDate()
      );

      if (thisMonth < today) {
        ret = true;
      }

      break;
    }
    case AvailableReoccurences[2].value: {
      //Yearly
      const thisYear = new Date(today.getFullYear(), 0, 1);
      if (thisYear < today) {
        ret = true;
      }
      break;
    }
  }

  return ret;
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
