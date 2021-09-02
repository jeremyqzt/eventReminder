import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";
import { Divider, Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
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
  formatAgendaDate,
  getDaysInMonth,
  buildMonthDict,
  buildAgenda,
} from "../utils/utils";

const DayCard = (props) => {
  const iconColor = "black";
  const leftBorderColor = "black";
  const contactsText = "Test";
  const nextOccur = "tmr";
  const eventType = EventType[0].value;
  const dateText = "Jun-13";
  const helpText = "HELP WTFD";

  return (
    <Card
      containerStyle={
        props.darkMode
          ? { ...styles.cardDark, borderLeftColor: leftBorderColor }
          : { ...styles.cardNormal, borderLeftColor: leftBorderColor }
      }
      style={styles.cardTitle}
    >
      <View style={styles.cardTitle}>
        <Text style={props.darkMode ? styles.titleTextDark : styles.titleText}>
          Test
        </Text>
      </View>
      <Card.Divider />
      <View style={styles.infoContainer}>
        <View>
          <Icon name="user" type="feather" color={iconColor} />
          <Text style={{ color: iconColor }}>{contactsText}</Text>
        </View>
        <View>
          <Icon
            name={eventType === EventType[0].value ? "moon" : "sun"}
            type={"font-awesome-5"}
            color={iconColor}
          />
          <Text style={{ color: iconColor }}>{nextOccur}</Text>
        </View>
        <View>
          <Icon
            name="calendar"
            type="feather"
            color={
              props.darkMode
                ? DefaultTheme.darkMode.text
                : DefaultTheme.normalMode.text
            }
          />
          <Text style={{ color: iconColor }}>{dateText}</Text>
        </View>
      </View>
      {helpText ? (
        <View style={styles.items}>
          <View style={{ ...styles.subItemReminders, color: iconColor }}>
            <Icon
              name={"info"}
              type={"feather"}
              size={14}
              color={
                props.darkMode
                  ? DefaultTheme.darkMode.text
                  : DefaultTheme.normalMode.text
              }
            />
            <Text style={{ color: iconColor }}>{` ${helpText}`}</Text>
          </View>
        </View>
      ) : null}
    </Card>
  );
};

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

  const monthData = buildAgenda(new Date());

  const [renderData, _] = useState(monthData);

  const renderItem = (item) => {
    return <DayCard darkMode={props.darkMode} toRender={item} />;
  };

  const today = formatAgendaDate(new Date());

  return (
    <View style={{ height: "85%" }}>
      <Agenda
        items={renderData}
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
        selected={today}
        pastScrollRange={1}
        futureScrollRange={5}
        //renderEmptyData={renderEmptyItem}
        //renderEmptyDate={renderEmptyDate}
        theme={{}}
        style={{ height: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 75,
    width: "93%",
    left: "3%",
    borderColor: "black",
    borderWidth: 1,
    textAlignVertical: "center",
    padding: 10,
    marginVertical: 5,
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
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardNormal: {
    borderRadius: 15,
    borderLeftWidth: 7,
    borderLeftColor: "red",
  },
  cardDark: {
    borderRadius: 15,
    borderLeftWidth: 7,
    borderLeftColor: "red",
    borderColor: DefaultTheme.darkMode.kindaBlack,
    backgroundColor: DefaultTheme.darkMode.kindaBlack,
  },
  card: {
    borderRadius: 15,
    borderLeftWidth: 7,
    borderLeftColor: "red",
    borderColor: "#263238",
    backgroundColor: "#263238",
  },
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 7,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "800",
    color: DefaultTheme.normalMode.text,
  },
  titleTextDark: {
    fontSize: 25,
    fontWeight: "800",
    color: DefaultTheme.darkMode.kindaWhite,
  },
  items: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  subItemReminders: {
    marginTop: -30,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: "auto",
  },
  reminderText: {
    fontSize: 18,
    color: DefaultTheme.darkMode.kindaWhite,
  },
  reminderTextDark: {
    fontSize: 18,
    color: DefaultTheme.normalMode.text,
  },
  checkbox: {
    marginHorizontal: 1,
    paddingHorizontal: 1,
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
