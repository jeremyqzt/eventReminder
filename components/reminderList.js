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
  return (
    <View style={styles.scrollContainer}>
      <ScrollView style={styles.scrollView}>
        <ReminderItem />
        <AdditionButton />
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
          return;
        }}
      >
        <Text style={styles.addBtnTextStyle}>Add Event</Text>
      </TouchableHighlight>
    </View>
  );
};

const ReminderItem = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("Event Date");

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
        <TouchableHighlight onPress={showDatePicker}>
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
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 0,
  },
  addBtnTextStyle: {
    color: colors.secondary,
    fontSize: 14,
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
