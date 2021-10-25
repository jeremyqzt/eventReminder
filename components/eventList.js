import * as React from "react";
import { View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import AddEventTile from "./addEventTile";
import { styles } from "./styles";

import SuchEmptyWow from "./suchEmpty";

const EventsList = (props) => {
  const allEventIds = props.events.allIds || [];
  const allEventById = props.events.byId || {};
  const notifs = props.notifs || false;

  React.useEffect(() => {
    if (!notifs) return;
    // Use this to schedule all notifications

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

      const allNextOccurenceDate = getNextXOccurence(
        eventDate,
        allEventById[key].reoccurence,
        todayTyped
      );

      allNextOccurenceDate.forEach((nextOccurenceDate) => {
        const nextOccurTyped =
          allEventById[key].type === EventType[0].value
            ? getEqualGregorianDate(nextOccurenceDate)
            : nextOccurenceDate;
        console.log(nextOccurTyped);
      });
    });
  }, [allEventById, allEventIds, notifs]);

  if (allEventIds.length === 0) {
    return (
      <ScrollView>
        <SuchEmptyWow darkMode={props.darkMode} />
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={allEventIds}
      renderItem={({ item }) => {
        return <AddEventTile event={allEventById[item]} />;
      }}
      keyExtractor={(_, index) => index.toString()}
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
