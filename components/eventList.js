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
      console.log(deepLinkedEvent);
      setTopEvent(deepLinkedEvent);
    }
  }, [deepLinkedEvent]);

  if (allEventIds.length === 0) {
    return (
      <ScrollView>
        <SuchEmptyWow darkMode={darkMode} />
      </ScrollView>
    );
  }

  const sortType = props.sortType;

  let eventIds = allEventIds;
  let pastEvents = undefined;

  switch (sortType.value) {
    case EVENT_SORT[0].value: {
      eventIds = allEventIds;
      break;
    }
    case EVENT_SORT[1].value: {
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
            daysUntil: daysUntil < 0 ? Math.infinity : daysUntil,
          });
        } else {
          allPastEvents.push({
            ...allEventById[key],
            daysUntil: daysUntil < 0 ? Math.infinity : daysUntil,
          });
        }
      });

      const eventIdsObj = allEvents.sort(
        (a, b) => parseFloat(a.daysUntil) - parseFloat(b.daysUntil)
      );

      const pastEventsObj = allPastEvents.sort(
        (a, b) => parseFloat(a.daysUntil) - parseFloat(b.daysUntil)
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

  const eventIdsFilter = eventIds.filter((id) => id !== topEvent);
  const newEventIds = topEvent ? [topEvent, ...eventIdsFilter] : eventIdsFilter;

  return (
    <KeyboardAwareScrollView extraHeight={300}>
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
        ListFooterComponent={<View style={styles.shortFlat} />}
      />
      {pastEvents ? (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              marginLeft: 20,
            }}
          >
            Past Events
          </Text>
          <FlatList
            data={pastEvents}
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
            ListFooterComponent={<View style={styles.flat} />}
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
