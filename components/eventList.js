import * as React from "react";
import { View, FlatList, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import AddEventTile from "./addEventTile";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useColorScheme } from "../utils/utils";

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
  const deepLinkedEvent = props.deepLinkedEvent;
  const [topEvent, setTopEvent] = React.useState(null);

  React.useEffect(() => {
    if (deepLinkedEvent !== "-1" && deepLinkedEvent) {
      setTopEvent(deepLinkedEvent);
    }
  }, [deepLinkedEvent]);

  const sortType = props.sortType;

  let eventIds = allEventIds;
  let pastEvents = undefined;

  const pastOnly = sortType.value == EVENT_SORT[3].value;

  switch (sortType.value) {
    case EVENT_SORT[0].value: {
      eventIds = allEventIds;
      break;
    }
    case EVENT_SORT[1].value:
    case EVENT_SORT[3].value: {
      const allEvents = [];
      const allPastEvents = [];
      allEventIds.forEach((key) => {
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

        if (daysUntil >= 0) {
          allEvents.push({
            ...allEventById[key],
            eventDate,
            daysUntil: daysUntil < 0 ? Math.infinity : daysUntil,
          });
        } else {
          allPastEvents.push({
            ...allEventById[key],
            eventDate,
            daysUntil: daysUntil < 0 ? Math.infinity : daysUntil,
          });
        }
      });

      const eventIdsObj = allEvents.sort(
        (a, b) => parseFloat(a.daysUntil) - parseFloat(b.daysUntil)
      );

      const pastEventsObj = allPastEvents.sort(
        (a, b) => b.eventDate - a.eventDate
      );

      eventIds = eventIdsObj.map((event) => event.id);
      pastEvents = pastEventsObj.map((event) => event.id);
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

  if (allEventIds.length === 0) {
    return (
      <ScrollView>
        <SuchEmptyWow darkMode={darkMode} />
      </ScrollView>
    );
  }

  const eventIdsFilter = eventIds.filter((id) => id !== topEvent);
  const pastEventsFilter = (pastEvents || []).filter((id) => id !== topEvent);
  const newEventIds = topEvent ? [topEvent, ...eventIdsFilter] : eventIdsFilter;

  return (
    <KeyboardAwareScrollView extraHeight={300}>
      {!pastOnly ? (
        <FlatList
          data={newEventIds}
          renderItem={({ item }) => {
            return (
              <AddEventTile
                event={allEventById[item]}
                sortType={sortType}
                goEvents={props.goEvents}
                expand={deepLinkedEvent === item}
              />
            );
          }}
          keyExtractor={(item, _) => {
            return item;
          }}
          ListFooterComponent={
            <View
              style={
                pastEventsFilter.length === 0
                  ? styles.shortFlat
                  : styles.shorterFlat
              }
            />
          }
        />
      ) : null}
      {pastEventsFilter.length !== 0 ? (
        <>
          {!pastOnly ? (
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 20,
                marginLeft: 20,
                color: darkMode ? "white" : "black",
              }}
            >
              Past Events
            </Text>
          ) : null}
          <FlatList
            data={pastEventsFilter}
            renderItem={({ item }) => {
              return (
                <AddEventTile
                  event={allEventById[item]}
                  sortType={sortType}
                  goEvents={props.goEvents}
                  expand={false}
                />
              );
            }}
            keyExtractor={(item, _) => {
              return item;
            }}
            ListFooterComponent={<View style={styles.longFlat} />}
          />
        </>
      ) : null}
    </KeyboardAwareScrollView>
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
