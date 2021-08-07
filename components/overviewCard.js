import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, CheckBox, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { DefaultTheme, Everyone, EventType } from "../utils/constants";
import {
  getNextOccurence,
  formatDate,
  getEqualGregorianDate,
  getEqualLunarDate,
  getDifferenceFromToday,
  buildEventAdditionalMessage,
} from "../utils/utils";

const OverviewCard = (props) => {
  const [checked, setChecked] = useState(false);
  const allContacts = props.contacts;
  const contactsCount = props.event.contacts.length || 0;

  const isEveryone = props.event.contacts.some(
    (event) => event === Everyone.value
  );

  const contactsText = isEveryone
    ? "Everyone"
    : contactsCount === 1
    ? allContacts[props.event.contacts[0]].firstName
    : contactsCount > 1
    ? `${allContacts[props.event.contacts[0]].firstName} + ${contactsCount - 1}`
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
  console.log(helpText);
  const leftBorderColor = props.event.color;
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
          <Icon
            name="user"
            type="feather"
            color={
              props.darkMode
                ? DefaultTheme.darkMode.text
                : DefaultTheme.normalMode.text
            }
          />
          <Text>{contactsText}</Text>
        </View>
        <View>
          <Icon
            name={props.event.type === EventType[0].value ? "moon" : "sun"}
            type={"feather"}
            color={
              props.darkMode
                ? DefaultTheme.darkMode.text
                : DefaultTheme.normalMode.text
            }
          />
          <Text>{nextOccur}</Text>
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
          <Text>{`T-${daysUntil} Days`}</Text>
        </View>
      </View>
      <View style={styles.items}>
        {helpText ? (
          <View style={styles.subItemReminders}>
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
            <Text>{` ${helpText}`}</Text>
          </View>
        ) : null}
      </View>
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
    marginTop: 30,
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
