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

export const createDateKey = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
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

export const getNextXOccurence = (date, reoccurType, today, X = 6) => {
  let ret = null;

  const yearsToProject = X <= 12 ? 1 : Math.ceil(X / 12);

  switch (reoccurType) {
    // Case 1, Does not reoccur
    case AvailableReoccurences[0].value: {
      ret = [date];
      break;
    }
    // Case 2, Monthly
    case AvailableReoccurences[1].value: {
      ret = [];
      let nextCtr = today;
      for (let i = 0; i < X; i++) {
        const nextOccur = getNextMonthOccurence(date, nextCtr);
        ret.push(nextOccur);
        nextCtr = nextOccur;
      }
      break;
    }
    // Case 3, Yearly
    case AvailableReoccurences[2].value: {
      ret = [];
      let nextCtr = today;
      for (let i = 0; i < yearsToProject; i++) {
        const nextOccur = getNextYearOccurence(date, nextCtr);
        ret.push(nextOccur);
        nextCtr = nextOccur;
      }
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

export const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export const buildMonthDict = (monthStr, year, days) => {
  let ret = {};

  const month = Number(monthStr) < 10 ? `0${monthStr}` : monthStr;
  for (let i = 0; i <= days; i++) {
    const dayStr = Number(i) < 10 ? `0${i}` : i;

    ret[`${year}-${month}-${dayStr}`] = [
      { name: `${year}-${month}-${dayStr}`, height: 55 },
    ];
  }

  return ret;
};

export const buildAgenda = (today) => {
  let dateDict = {};

  const month = today.getMonth() + 12;
  for (let i = month - 1; i <= month + 6; i++) {
    const dateToBuild = new Date(today.getFullYear(), i - 12, 0);
    const days = getDaysInMonth(
      dateToBuild.getMonth(),
      dateToBuild.getFullYear()
    );
    dateDict = {
      ...dateDict,
      ...buildMonthDict(
        dateToBuild.getMonth() + 1,
        dateToBuild.getFullYear(),
        days
      ),
    };
  }

  return dateDict;
};
