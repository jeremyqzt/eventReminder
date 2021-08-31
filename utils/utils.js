import {
  AvailableReoccurences,
  EventType,
  lunarHolidays,
  gregorianHolidays,
} from "./constants";

import moment from "moment";
import "moment-lunar";

Date.prototype.isSameDateAs = function (pDate) {
  return (
    this.getFullYear() === pDate.getFullYear() &&
    this.getMonth() === pDate.getMonth() &&
    this.getDate() === pDate.getDate()
  );
};

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

  if (wouldBeThisMonth.isSameDateAs(today)) {
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

  if (wouldBeThisYear.isSameDateAs(today)) {
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
  today.setHours(today.getHours() - 4);

  if (date.isSameDateAs(today)) {
    return 0;
  }

  if (date > today) {
    const diffTime = Math.abs(date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return -1;
};

export const buildEventAdditionalMessage = (month, day, type) => {
  const dictLookup =
    type === EventType[0].value ? lunarHolidays : gregorianHolidays;

  const monthText = Number(month) + 1;
  const key = `${monthText}-${day}`;

  if (dictLookup.hasOwnProperty(key)) {
    return dictLookup[key];
  }

  return null;
};

export const formatAgendaDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
