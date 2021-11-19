import * as React from "react";
import { View, FlatList, ScrollView, useColorScheme } from "react-native";
import { connect } from "react-redux";
import AddEventTile from "./addEventTile";
import { styles } from "./styles";

import SuchEmptyWow from "./suchEmpty";
import { EVENT_SORT, EventType } from "../utils/constants";

import {
  getNextOccurence,
  getEqualGregorianDate,
  getEqualLunarDate,
  getDifferenceFromToday,
} from "../utils/utils";

const EventsList = (props) => {
  const allEventIds = props.events.allIds || [];
  const allEventById = props.events.byId || {};
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;
  if (allEventIds.length === 0) {
    return (
      <ScrollView>
        <SuchEmptyWow darkMode={darkMode} />
      </ScrollView>
    );
  }

  const sortType = props.sortType;

  let eventIds = allEventIds;
  switch (sortType.value) {
    case EVENT_SORT[0].value: {
      eventIds = allEventIds;
      break;
    }
    case EVENT_SORT[1].value: {
      const allEvents = allEventIds.map((key) => {
        const eventDate = new Date(
          allEventById[key].year,
          allEventById[key].month,
          allEventById[key].day
        );
        const today = new Date();
        const todayTyped =
          allEventById[key].type === EventType[0].value
            ? getEqualLunarDate(today)
            : today;

        const nextOccurenceDate = getNextOccurence(
          eventDate,
          allEventById[key].reoccurence,
          todayTyped
        );
        const nextOccurTyped =
          allEventById[key].type === EventType[0].value
            ? getEqualGregorianDate(nextOccurenceDate)
            : nextOccurenceDate;

        const daysUntil = getDifferenceFromToday(nextOccurTyped);
        return {
          ...allEventById[key],
          daysUntil: daysUntil < 0 ? Math.infinity : daysUntil,
        };
      });

      const eventIdsObj = allEvents.sort(
        (a, b) => parseFloat(a.daysUntil) - parseFloat(b.daysUntil)
      );

      eventIds = eventIdsObj.map((event) => event.id);
      break;
    }
    case EVENT_SORT[2].value: {
      const allEvents = allEventIds.map((key) => {
        const eventDate = new Date(
          allEventById[key].year,
          allEventById[key].month,
          allEventById[key].day
        );

        return {
          ...allEventById[key],
          eventDate: eventDate,
        };
      });

      const eventIdsObj = allEvents.sort((a, b) => a.eventDate - b.eventDate);
      eventIds = eventIdsObj.map((event) => event.id);
      break;
    }
    default: {
      break;
    }
  }

  return (
    <FlatList
      data={eventIds}
      renderItem={({ item }) => {
        return <AddEventTile event={allEventById[item]} />;
      }}
      keyExtractor={(item, _) => {
        return item;
      }}
      ListFooterComponent={<View style={styles.flat} />}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    notifs: state.settingsReducer.notifs,
    events: state.eventsReducer,
  };
};

export default connect(mapStateToProps, null)(EventsList);
