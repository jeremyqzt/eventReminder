import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import moment from "moment";
import "moment-lunar";

import { DefaultTheme, defaultEvent } from "../utils/constants";
import { addEvent } from "../actions/actions";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
const Caldendar = (props) => {
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
      <TouchableOpacity onPress={() => console.log("test")}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Caldendar);
