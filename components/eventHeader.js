import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import moment from "moment";
import "moment-lunar";

import { DefaultTheme, defaultEvent } from "../utils/constants";
import { addEvent } from "../actions/actions";

const HeadingText = (props) => {
  const textColor = props.darkMode ? styles.textDark : styles.textNormal;
  const today = new Date();
  const todayLunar = moment()
    .year(today.getFullYear())
    .month(today.getMonth())
    .date(today.getDate())
    .lunar()
    .format("MMM, DD YYYY");

  return (
    <View>
      <Text
        style={[tailwind("font-bold text-2xl"), textColor]}
      >{`Events`}</Text>
      <Text style={[tailwind("font-semibold"), textColor]}>
        <Icon name="calendar" size={15} />
        {` ${moment().format("MMM, DD YYYY")}`}
      </Text>
      <Text style={[tailwind("font-semibold"), textColor]}>
        <Icon name="moon-o" size={15} />
        {` ${todayLunar}`}
      </Text>
    </View>
  );
};

const HeadingImage = (props) => {
  const textColor = props.darkMode ? styles.textNormal : styles.textDark;
  const iconColor = props.darkMode
    ? DefaultTheme.normalMode.text
    : DefaultTheme.darkMode.text;

  const addEvent = () => {
    props.addEvent(defaultEvent);
  };

  return (
    <View style={tailwind("items-center rounded px-1 py-1")}>
      <Button
        icon={<Icon name="calendar-plus-o" size={15} color={iconColor} />}
        buttonStyle={props.darkMode ? styles.buttonDark : styles.buttonNormal}
        title=" Add Event"
        titleStyle={textColor}
        raised
        onPress={addEvent}
      />
    </View>
  );
};

const HeadingEvent = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          tailwind("px-5 py-1 flex-row flex justify-between items-center"),
          styles.header,
        ]}
      >
        <HeadingText darkMode={props.darkMode} />
        <HeadingImage darkMode={props.darkMode} addEvent={props.addEvent} />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (event) => dispatch(addEvent(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadingEvent);
