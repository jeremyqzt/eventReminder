import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import moment from "moment";
import "moment-lunar";
import { useColorScheme } from "../utils/utils";

import { DefaultTheme, defaultEvent, EVENT_SORT } from "../utils/constants";
import { addEvent } from "../actions/actions";
import { Picker } from "react-native-woodpicker";

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
  const eventSortOpts = EVENT_SORT;

  return (
    <View
      style={{
        overflow: "hidden",
        display: "flex",
        alignContent: "flex-end",
        width: "50%",
      }}
    >
      <Button
        icon={<Icon name="calendar-plus-o" size={12} color={iconColor} />}
        buttonStyle={props.darkMode ? styles.buttonDark : styles.buttonNormal}
        title=" Add Event"
        titleStyle={textColor}
        onPress={addEvent}
      />
      <View
        style={{
          overflow: "hidden",
          height: 35,
          marginTop: 5,
          display: "flex",
          alignContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: props.darkMode ? "white" : "black",
          }}
        >
          Sort By:
        </Text>
        <View
          style={{
            borderColor: "black",
            padding: 5,
            borderWidth: 1,
            position: "absolute",
            width: 110,
            alignItems: "center",
            borderRadius: 5,
            right: 0,
            ...(props.darkMode
              ? {
                  backgroundColor: "white",
                }
              : {}),
          }}
        >
          <Picker
            item={props.sortType}
            items={eventSortOpts}
            onItemChange={props.setSortType}
            mode="dropdown"
            placeholder={"Sort"}
          />
        </View>
      </View>
    </View>
  );
};

const HeadingEvent = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          tailwind("px-5 py-1 flex-row flex justify-between items-center"),
          styles.header,
        ]}
      >
        <HeadingText darkMode={darkMode} />
        <HeadingImage
          darkMode={darkMode}
          addEvent={props.addEvent}
          sortType={props.sortType}
          setSortType={props.setSortType}
        />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNormal: {
    backgroundColor: "#558b2f",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  buttonDark: {
    backgroundColor: "#aed581",
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
