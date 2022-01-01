import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "../utils/utils";

import { Card, Icon } from "react-native-elements";
import "moment-lunar";
import SuchEmptyWow from "./suchEmpty";
import { DefaultTheme, DELETED_CONTACT } from "../utils/constants";
import { addEvent } from "../actions/actions";
import { Agenda } from "react-native-calendars";
import { connect } from "react-redux";
import { EventType, Everyone, randomEmojis } from "../utils/constants";

import {
  formatDate,
  getEqualGregorianDate,
  getEqualLunarDate,
  getDifferenceFromToday,
  formatAgendaDate,
  buildAgenda,
  createDateKey,
  getNextXOccurence,
  getnThEventOccurTest,
} from "../utils/utils";

const DayCard = (props) => {
  const contactsCount = props.toRender.contacts.length || 0;
  const allContacts = props.contacts || {};
  const eventType = props.toRender.type;

  const isEveryone = (props.toRender.contacts || []).some(
    (event) => event === Everyone.value
  );

  const thisContact =
    Object.keys(allContacts) !== 0 && contactsCount !== 0
      ? props.toRender.contacts[0]
      : undefined;

  const contactCtx =
    thisContact && allContacts[thisContact]
      ? allContacts[props.toRender.contacts[0]]
      : DELETED_CONTACT;

  const contactsText = isEveryone
    ? contactsCount > 1
      ? `Myself + ${contactsCount - 1}`
      : "Myself"
    : contactsCount === 1
    ? contactCtx.firstName
    : contactsCount > 1
    ? `${contactCtx.firstName} + ${contactsCount - 1}`
    : "None";

  const iconColor = props.darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;
  const leftBorderColor = props.toRender.color;

  const nextOccurDate = props.toRender.nextOccur;
  const nextOccur = formatDate(nextOccurDate);

  const dateText =
    props.toRender.daysUntil !== 0
      ? props.toRender.daysUntil > 0
        ? `T-${props.toRender.daysUntil} Day(s)`
        : `Past ${Math.abs(props.toRender.daysUntil)} Day(s) Ago`
      : "Today!";
  const helpText = getnThEventOccurTest(props.toRender, nextOccurDate);

  return (
    <TouchableOpacity onPress={props.goEvents}>
      <Card
        containerStyle={
          props.darkMode
            ? {
                ...styles.cardDark,
                borderColor: leftBorderColor,
                borderLeftColor: leftBorderColor,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0,
              }
            : {
                ...styles.cardNormal,
                borderColor: leftBorderColor,
                borderLeftColor: leftBorderColor,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0,
              }
        }
        style={styles.cardTitle}
      >
        <View style={styles.cardTitle}>
          <Text
            style={props.darkMode ? styles.titleTextDark : styles.titleText}
          >
            {props.toRender.eventName ||
              `${
                randomEmojis[Math.floor(Math.random() * randomEmojis.length)]
              } Unamed Event`}
          </Text>
        </View>
        <Card.Divider />
        <View style={styles.infoContainer}>
          <View style={styles.inlineContainer}>
            <Icon name="user" type="feather" color={iconColor} />
            <Text style={{ color: iconColor }}>{contactsText}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Icon
              name={eventType === EventType[0].value ? "moon" : "sun"}
              type={"feather"}
              color={iconColor}
            />
            <Text style={{ color: iconColor }}>{nextOccur}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Icon name="calendar" type="feather" color={iconColor} />
            <Text style={{ color: iconColor }}>{dateText}</Text>
          </View>
        </View>
        {props.toRender.eventName && helpText ? (
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
    </TouchableOpacity>
  );
};

const Caldendar = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  const allEventIds = props.events.allIds || [];
  const allContactsById = props.contacts.byId || {};

  const allEventById = props.events.byId || {};

  let eventCount = 0;

  let allEventsArr = [];

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

      const daysUntil = getDifferenceFromToday(nextOccurTyped);
      if (daysUntil === 0) {
        eventCount++;
      }

      allEventsArr.push({
        ...allEventById[key],
        daysUntil: daysUntil,
        nextOccur: nextOccurTyped,
        dateKey: createDateKey(nextOccurTyped),
      });
    });
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

  const monthData = buildAgenda(new Date());

  allEventsArr.forEach((event) => {
    monthData[event.dateKey]
      ? monthData[event.dateKey].push({ ...event })
      : undefined;
  });

  const renderItem = (item) => {
    return (
      <DayCard
        goEvents={() => props.goEvents(item.id)}
        darkMode={darkMode}
        contactIds={allEventIds}
        contacts={allContactsById}
        toRender={item}
      />
    );
  };

  const today = formatAgendaDate(new Date());

  return (
    <View style={{ height: "85%" }}>
      <Agenda
        key={darkMode}
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
        selected={today}
        pastScrollRange={1}
        futureScrollRange={6}
        //renderEmptyData={renderEmptyItem}
        //renderEmptyDate={renderEmptyDate}
        theme={{
          calendarBackground: darkMode ? "black" : "white",
          backgroundColor: darkMode ? "black" : "white",
          "stylesheet.calendar.header": {
            week: {
              marginTop: 0,
              flexDirection: "row",
              justifyContent: "space-between",
            },
          },
        }}
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
    borderLeftWidth: 7,
    borderLeftColor: "red",
  },
  cardDark: {
    borderLeftWidth: 7,
    borderLeftColor: "red",
    borderColor: DefaultTheme.darkMode.kindaBlack,
    backgroundColor: DefaultTheme.darkMode.kindaBlack,
  },
  card: {
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
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
  },
  subItemReminders: {
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
  inlineContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
