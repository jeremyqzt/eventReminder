import React, { useEffect } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import OverviewCard from "./overviewCard";
import { styles } from "./styles";
import { EventType } from "../utils/constants";
import { useColorScheme } from "../utils/utils";

import SuchEmptyWow from "./suchEmpty";
import {
  getNextOccurence,
  getEqualGregorianDate,
  getEqualLunarDate,
  getDifferenceFromToday,
} from "../utils/utils";

const OverviewList = (props) => {
  const allEventIds = props.events.allIds || [];
  const allContactsById = props.contacts.byId || {};

  const allEventById = props.events.byId || {};

  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  let eventCount = 0;

  const allEventsArr = allEventIds.map((key) => {
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
    if (daysUntil === 0) {
      eventCount++;
    }

    return {
      ...allEventById[key],
      daysUntil: daysUntil,
    };
  });

  useEffect(() => {
    props.setCount(eventCount);
  }, [eventCount]);

  if (allEventIds.length === 0) {
    return (
      <ScrollView>
        <SuchEmptyWow useTree darkMode={darkMode} />
      </ScrollView>
    );
  }
  const allEventsSorted = allEventsArr.sort(
    (a, b) => parseFloat(a.daysUntil) - parseFloat(b.daysUntil)
  );

  const allEventsSortedAndFiltered = allEventsSorted.filter(
    (eve) => eve.daysUntil >= 0
  );
  return (
    <FlatList
      data={allEventsSortedAndFiltered}
      renderItem={({ item }) => {
        return (
          <OverviewCard
            event={item}
            contacts={allContactsById}
            goEvents={() => props.goEvents(item.id)}
          />
        );
      }}
      keyExtractor={(_, index) => index.toString()}
      ListFooterComponent={<View style={styles.flat} />}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    events: state.eventsReducer,
    contacts: state.contactsReducer,
  };
};

export default connect(mapStateToProps, null)(OverviewList);
