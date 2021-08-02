import * as React from "react";
import { View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import OverviewCard from "./overviewCard";
import { styles } from "./styles";

import SuchEmptyWow from "./suchEmpty";

const EventsList = (props) => {
  const allEventIds = props.events.allIds || [];
  const allEventById = props.events.byId || {};

  if (allEventIds.length === 0) {
    return (
      <ScrollView>
        <SuchEmptyWow />
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={allEventIds}
      renderItem={({ item }) => {
        return <OverviewCard event={allEventById[item]} />;
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
  };
};

export default connect(mapStateToProps, null)(EventsList);
