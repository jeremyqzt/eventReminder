import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, CheckBox, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { DefaultTheme } from "../utils/constants";

const OverviewCard = (props) => {
  const [checked, setChecked] = useState(false);
  const contactsCount = props.event.contacts.length || 0;
  const contactsText =
    contactsCount === 1
      ? props.event.contacts[0].label
      : contactsCount > 1
      ? `${props.event.contacts[0].label} + ${contactsCount - 1}`
      : "None";
  return (
    <Card
      containerStyle={props.darkMode ? styles.cardDark : styles.cardNormal}
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
            name="moon"
            type="feather"
            color={
              props.darkMode
                ? DefaultTheme.darkMode.text
                : DefaultTheme.normalMode.text
            }
          />
          <Text>{"Feb-15"}</Text>
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
          <Text>{"T-5 Days"}</Text>
        </View>
      </View>
      <View style={styles.items}>
        <View style={styles.subItemReminders}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={checked}
            onPress={() => setChecked(!checked)}
          />
          <Text
            style={
              props.darkMode ? styles.reminderText : styles.reminderTextDark
            }
          >
            {"Buy A Birthday Cake"}
          </Text>
        </View>
        <View style={styles.subItemReminders}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={checked}
            onPress={() => setChecked(!checked)}
          />
          <Text
            style={
              props.darkMode ? styles.reminderText : styles.reminderTextDark
            }
          >
            {"Send Best Wishes"}
          </Text>
        </View>
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
