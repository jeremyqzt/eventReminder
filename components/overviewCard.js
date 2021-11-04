import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  DefaultTheme,
  Everyone,
  EventType,
  DELETED_CONTACT,
} from "../utils/constants";
import {
  getNextOccurence,
  formatDate,
  getEqualGregorianDate,
  getEqualLunarDate,
  getDifferenceFromToday,
  buildEventAdditionalMessage,
} from "../utils/utils";

const OverviewCard = (props) => {
  const allContacts = props.contacts;
  const contactsCount = props.event.contacts.length || 0;

  const isEveryone = (props.event.contacts || []).some(
    (event) => event === Everyone.value
  );

  const thisContact =
    Object.keys(allContacts) !== 0 && contactsCount !== 0
      ? props.event.contacts[0]
      : undefined;

  const contactCtx =
    thisContact && allContacts[thisContact]
      ? allContacts[props.event.contacts[0]]
      : DELETED_CONTACT;

  const contactsText = isEveryone
    ? "Everyone"
    : contactsCount === 1
    ? contactCtx.firstName
    : contactsCount > 1
    ? `${contactCtx.firstName} + ${contactsCount - 1}`
    : "None";

  const eventDate = new Date(
    props.event.year,
    props.event.month,
    props.event.day
  );

  const today = new Date();
  const todayTyped =
    props.event.type === EventType[0].value ? getEqualLunarDate(today) : today;

  const nextOccurenceDate = getNextOccurence(
    eventDate,
    props.event.reoccurence,
    todayTyped
  );

  const nextOccur = formatDate(nextOccurenceDate);
  const nextOccurTyped =
    props.event.type === EventType[0].value
      ? getEqualGregorianDate(nextOccurenceDate)
      : nextOccurenceDate;

  const daysUntil = getDifferenceFromToday(nextOccurTyped);

  const helpText = buildEventAdditionalMessage(
    props.event.month,
    props.event.day,
    props.event.type
  );
  const leftBorderColor = props.event.color;
  const iconColor = props.darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;

  const dateText = daysUntil === 0 ? "Today!" : `T-${daysUntil} Days`;
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
          {props.event.eventName}
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
            name={props.event.type === EventType[0].value ? "moon" : "sun"}
            type={"feather"}
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

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, null)(OverviewCard);
