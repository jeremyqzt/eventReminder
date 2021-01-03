import React, { useState } from "react";
import {
  TouchableHighlight,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import CheckBox from "react-native-checkbox-lite";

import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { getEvents, getTheme } from "../utils/utils.js";
import { EventEnum } from "../utils/constants.js";

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
  const [type, setType] = useState(EventEnum.placeHolder.value);
  const [isChecked, setIsChecked] = useState(true);

  const [description, setDescription] = useState(undefined);

  const toogleCheckBox = () => {
    setIsChecked(!isChecked);
  };

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

  const setEventType = (type) => {
    setType(type);
  };

  const needExtraRow =
    type === EventEnum.events[3].value || type === EventEnum.events[4].value;
  return (
    <View>
      <View
        style={[
          styles.container,
          needExtraRow ? { marginBottom: 3 } : { marginBottom: 10 },
        ]}
      >
        <View style={styles.selection}>
          <RNPickerSelect
            placeholder={getEvents().placeHolder}
            onValueChange={(value) => setEventType(value)}
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

      {needExtraRow ? (
        <View style={styles.container}>
          <TextInput
            style={styles.formInput}
            placeholder="Enter a description for this event..."
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />
          <CheckBox
            text={"Reoccurs"}
            isChecked={isChecked}
            onPress={toogleCheckBox}
            checkBoxColor={"#2980b9"}
          />
        </View>
      ) : null}
    </View>
  );
};

const borderColor = "#D3D3D3";

const styles = StyleSheet.create({
  addBtnRow: {
    flex: 1,
    marginBottom: 3,
    width: "100%",
  },
  formInput: {
    width: "70%",
    marginTop: 2,
    marginBottom: 5,
    borderColor: borderColor,
    borderBottomWidth: 1,
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
    marginHorizontal: 3,
    marginTop: "auto",
    borderRadius: 25,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: "column",
  },
  scrollView: {
    paddingBottom: 5,
    paddingTop: 5,
    maxHeight: 150,
  },
  container: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selection: {
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    width: "30%",
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
