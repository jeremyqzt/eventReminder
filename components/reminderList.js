import React, { useState } from "react";
import {
  TouchableHighlight,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { getEvents, getTheme } from "../utils/utils.js";

const colors = getTheme();

const ReminderList = (props) => {
  const addEvent = () => {
    props.addEvent(props.type);
  };

  const deleteEvent = (index) => {
    props.deleteEvent(props.type, index);
  };

  const getEvents = () => {
    const toRender = props.events.map((item, index) => {
      return (
        <ReminderItem event={item} index={index} deleteItem={deleteEvent} />
      );
    });
    return toRender;
  };

  return (
    <View style={styles.scrollContainer}>
      <ScrollView style={styles.scrollView}>
        {getEvents()}
        <AdditionButton add={addEvent} />
      </ScrollView>
    </View>
  );
};

const AdditionButton = (props) => {
  return (
    <View style={styles.addBtnRow}>
      <TouchableHighlight
        style={styles.addBtn}
        underlayColor={colors.primary}
        onPress={() => {
          props.add();
        }}
      >
        <Text style={styles.addBtnTextStyle}>Add New Event</Text>
      </TouchableHighlight>
    </View>
  );
};

const ReminderItem = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("Pick a Date");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (newDate) => {
    setDate(newDate.toISOString().slice(0, 10));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.selection}>
        <RNPickerSelect
          placeholder={getEvents().placeHolder}
          onValueChange={(value) => console.log(value)}
          items={getEvents().events}
        />
      </View>
      <View style={styles.selectionBridge}>
        <Text>{"Occurs on"}</Text>
      </View>

      <View style={styles.dateSelection}>
        <TouchableHighlight onPress={showDatePicker}>
          <Text>{date}</Text>
        </TouchableHighlight>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.deleteSelection}>
        <TouchableHighlight
          onPress={() => {
            props.deleteItem(props.index);
          }}
        >
          <Text>{"🗑️"}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const borderColor = "#D3D3D3";

const styles = StyleSheet.create({
  addBtnRow: {
    flex: 1,
    width: "100%",
  },
  addBtn: {
    borderColor: colors.secondary,
    borderWidth: 1,
    marginLeft: "auto",
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 0,
  },
  addBtnTextStyle: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteSelection: {
    borderColor: borderColor,
    borderWidth: 1,
    padding: 3,
    borderRadius: 25,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: "column",
  },
  scrollView: {
    paddingBottom: 5,
    paddingTop: 5,
    maxHeight: 160,
  },
  container: {
    flex: 1,
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selection: {
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    width: "35%",
    marginTop: "auto",
  },
  dateSelection: {
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    marginTop: "auto",
  },
  selectionBridge: {
    width: "20%",
    marginTop: "auto",
  },
  datePicker: {
    width: 200,
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerStyle: {
    height: 150,
    width: "80%",
    color: "#344953",
    justifyContent: "center",
  },
});

export default ReminderList;
