import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import moment from "moment";
import "moment-lunar";
import SuchEmptyWow from "./suchEmpty";

import { DefaultTheme, defaultEvent } from "../utils/constants";
import { addEvent } from "../actions/actions";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { connect } from "react-redux";
import OverviewCard from "./overviewCard";
import { EventType } from "../utils/constants";

import {
  getNextOccurence,
  getEqualGregorianDate,
  getEqualLunarDate,
  getDifferenceFromToday,
} from "../utils/utils";

const Caldendar = (props) => {
  const allEventIds = props.events.allIds || [];
  const allContactsById = props.contacts.byId || {};

  const allEventById = props.events.byId || {};

  if (allEventIds.length === 0) {
    return (
      <ScrollView>
        <SuchEmptyWow useTree darkMode={props.darkMode} />
      </ScrollView>
    );
  }

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
    if (eventCount > 0) {
      //props.setCount(eventCount);
    }
  }, [eventCount]);

  const allEventsSorted = allEventsArr.sort(
    (a, b) => parseFloat(a.daysUntil) - parseFloat(b.daysUntil)
  );

  const getMonthData = () => {
    let dataToReturn = {
      "2020-09-01": [{ name: "item 1 - any js object", height: 55 }],
      "2020-09-02": [{ name: "item 1 - any js object", height: 55 }],
      "2020-09-03": [{ name: "item 2 - any js object", height: 55 }],
      "2020-09-06": [
        { name: "item 3 - any js object", height: 55 },
        { name: "any js object", height: 55 },
      ],
    };
    return dataToReturn;
  };
  const monthData = getMonthData();
  const renderItem = (item) => {
    return (
      <>
        <View style={styles.card}>
          <Text>{item.name}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={{ height: 600 }}>
      <Agenda
        items={monthData}
        renderItem={(item) => {
          return renderItem(item);
        }}
        renderEmptyDate={() => {
          return <View />;
        }}
        renderEmptyData={() => {
          return <View />;
        }}
        showClosingKnob={true}
        selected={"2020-09-01"}
        pastScrollRange={1}
        futureScrollRange={1}
        //renderEmptyData={renderEmptyItem}
        //renderEmptyDate={renderEmptyDate}
        //theme={calendarTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 75,
    borderColor: "black",
    textAlignVertical: "center",
    padding: 10,
  },
  buttonNormal: {
    backgroundColor: DefaultTheme.darkMode.background,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  buttonDark: {
    backgroundColor: DefaultTheme.normalMode.background,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  textDark: {
    color: DefaultTheme.darkMode.text,
  },
  textNormal: {
    color: DefaultTheme.normalMode.text,
  },
  headerContainer: {
    marginBottom: 0,
  },
  header: {
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    events: state.eventsReducer,
    contacts: state.contactsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (event) => dispatch(addEvent(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Caldendar);
