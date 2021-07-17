import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import AddEventTile from "./addEventTile";

import SuchEmptyWow from "./suchEmpty";

const ContactsList = (props) => {
  const allEventIds = props.events.allIds || [];
  const allEventById = props.events.byId || {};

  if (allEventIds.length === 0) {
    return <SuchEmptyWow />;
  }

  return (
    <View>
      {allEventIds.map((event, index) => {
        return <AddEventTile contact={allEventById[event]} key={index} />;
      })}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    events: state.eventsReducer,
  };
};

export default connect(mapStateToProps, null)(ContactsList);
