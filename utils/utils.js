import {
  AvailableReoccurences,
  EventType,
  lunarHolidays,
  gregorianHolidays,
} from "./constants";
import * as Notifications from "expo-notifications";

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

export const getOffsetOccurence = (date, x = { year: 0, month: 0, day: 1 }) => {
  return new Date(
    date.getFullYear() + x.year || 0,
    date.getMonth() + x.month || 0,
    date.getDate() + x.day || 0
  );
};

export const getNextOccurence = (date, reoccurType, today, x) => {
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

export const getNextXOccurence = (
  date,
  reoccurType,
  today,
  X = 7,
  offset = 0
) => {
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
        nextCtr = new Date(
          nextOccur.getFullYear(),
          nextOccur.getMonth(),
          nextOccur.getDate() + 1
        );
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
        nextCtr = new Date(
          nextOccur.getFullYear(),
          nextOccur.getMonth(),
          nextOccur.getDate() + 1
        );
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

    ret[`${year}-${month}-${dayStr}`] = [];
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

export const schedulePushNotification = async (content, date) => {
  return Notifications.scheduleNotificationAsync({
    content: {
      ...content,
    },
    trigger: {
      date: date,
    },
  });
};

export const scheduleAllEventNotifs10Years = async (allEvents, updateFunc) => {
  const allEventKeys = Object.keys(allEvents);

  for (const key of allEventKeys) {
    const event = allEvents[key];
    const { type, reoccurence, year, month, day } = event;

    const nids = await scheduleNext10Years(
      { year, month, day },
      type,
      reoccurence,
      event
    );

    updateFunc({ ...event, notifs: [...nids] });
  }
};

export const isEmoji = (str) => {
  var ranges = [
    "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
  ];
  if (str.match(ranges.join("|"))) {
    return true;
  } else {
    return false;
  }
};

export const buildEventDescription = (event, nextOccur) => {
  let msg = "";
  switch (event.reoccurence) {
    // Case 1, Does not reoccur
    case AvailableReoccurences[0].value: {
      msg = "Gentle Reminder That This Event Occurs Today!";
      break;
    }
    // Case 2, Monthly
    case AvailableReoccurences[1].value: {
      const reoccurCount =
        (nextOccur.getUTCFullYear() - event.year) * 12 +
        (nextOccur.getMonth() - event.month);
      msg = `Gentle Reminder That ${event.eventName} Occurs Today! (${reoccurCount} occurences and counting)`;
      break;
    }
    // Case 3, Yearly
    case AvailableReoccurences[2].value: {
      const reoccurCount = nextOccur.getFullYear() - event.year;
      msg = `Gentle Reminder That ${event.eventName} Occurs Today! (${reoccurCount} occurences and counting)`;

      break;
    }
  }

  return {
    title: isEmoji(event.eventName)
      ? `${event.eventName}`
      : `📬 ${event.eventName}`,
    body: `${msg}`,
  };
};

export const getnThEventOccurTest = (event, nextOccur) => {
  let msg = "";
  switch (event.reoccurence) {
    // Case 1, Does not reoccur
    case AvailableReoccurences[0].value: {
      msg = "This is a single occruence event.";
      break;
    }
    // Case 2, Monthly
    case AvailableReoccurences[1].value: {
      const reoccurCount =
        (nextOccur.getFullYear() - event.year) * 12 +
        (nextOccur.getMonth() - event.month) +
        1;
      msg = `${event.eventName}'s ${reoccurCount} monthiversary!`;
      break;
    }
    // Case 3, Yearly
    case AvailableReoccurences[2].value: {
      const reoccurCount = nextOccur.getFullYear() - event.year + 1;
      msg = `${event.eventName}'s ${reoccurCount} anniversary!`;
      break;
    }
  }

  return msg;
};

export const scheduleNext10Years = async (
  inDate,
  dateType,
  reoccurence,
  event
) => {
  const eventDate = new Date(inDate.year, inDate.month, inDate.day);
  const today = new Date();
  const todayTyped =
    dateType === EventType[0].value ? getEqualLunarDate(today) : today;

  const ret = [];

  const allNextOccurenceDate = (
    getNextXOccurence(eventDate, reoccurence, todayTyped, 2 * 12) || []
  ).filter((date) => date > new Date());

  if (allNextOccurenceDate.length === 0) return [];

  for (let i = 0; i < allNextOccurenceDate.length; i++) {
    const nextOccurenceDate = allNextOccurenceDate[i];
    const nextOccurUntyped =
      dateType === EventType[0].value
        ? getEqualGregorianDate(nextOccurenceDate)
        : nextOccurenceDate;

    const content = buildEventDescription(event, nextOccurUntyped);

    /*{
      title: "You've got mail! 📬",
      body: `${nextOccurUntyped}`,
    };*/

    const nid = await schedulePushNotification(content, nextOccurUntyped);
    ret.push(nid);
  }

  return ret;
};

import * as Calendar from "expo-calendar";

export const scheduleAllEventCalendar10Years = async (allEvents, id) => {
  const allEventKeys = Object.keys(allEvents);
  const ret = [];
  for (const key of allEventKeys) {
    const event = allEvents[key];
    const { type, reoccurence, year, month, day } = event;

    const nids = await scheduleNext10YearsCalendar(
      { year, month, day },
      type,
      reoccurence,
      event,
      id
    );
    ret.push(...nids);
  }

  return ret;
};

export const scheduleNext10YearsCalendar = async (
  inDate,
  dateType,
  reoccurence,
  event,
  id
) => {
  const eventDate = new Date(inDate.year, inDate.month, inDate.day);
  const today = new Date();
  const todayTyped =
    dateType === EventType[0].value ? getEqualLunarDate(today) : today;

  const ret = [];

  const allNextOccurenceDate = (
    getNextXOccurence(eventDate, reoccurence, todayTyped, 2 * 12) || []
  ).filter((date) => date > new Date());

  if (allNextOccurenceDate.length === 0) return [];

  for (let i = 0; i < allNextOccurenceDate.length; i++) {
    const nextOccurenceDate = allNextOccurenceDate[i];
    const nextOccurUntyped =
      dateType === EventType[0].value
        ? getEqualGregorianDate(nextOccurenceDate)
        : nextOccurenceDate;

    const { title, body } = buildEventDescription(event, nextOccurUntyped);

    const nid = await Calendar.createEventAsync(id, {
      title,
      notes: event.notes ? event.notes : body,
      allDay: true,
      startDate: nextOccurUntyped,
      endDate: nextOccurUntyped,
      timeZone: "Asia/Hong_Kong",
    });
    ret.push(nid);
  }

  return ret;
};

export const cancelNotifs = async (nids) => {
  nids.forEach((nid) => Notifications.cancelScheduledNotificationAsync(nid));
};

export const cancelNotif = async (nid) => {
  return Notifications.cancelScheduledNotificationAsync(nid);
};

export const cancelAllNotif = async (nid) => {
  return Notifications.cancelAllScheduledNotificationsAsync();
};

import { Appearance } from "react-native";
import { useEffect, useRef, useState } from "react";

export const useColorScheme = (delay = 500) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  let timeout = useRef(null).current;

  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange);

    return () => {
      resetCurrentTimeout();
      Appearance.removeChangeListener(onColorSchemeChange);
    };
  }, []);

  function onColorSchemeChange(preferences) {
    resetCurrentTimeout();

    timeout = setTimeout(() => {
      setColorScheme(preferences.colorScheme);
    }, delay);
  }

  function resetCurrentTimeout() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  return colorScheme;
};
