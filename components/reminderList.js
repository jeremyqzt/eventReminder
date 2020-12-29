import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-date-picker";

const ReminderList = (props) => {
  return (
    <ScrollView style={styles.scrollView}>
      <ReminderItem />
    </ScrollView>
  );
};

const ReminderItem = (props) => {
  const selectionInit = {
    event: "None",
  };
  const [date, setDate] = useState(new Date());

  const [selection, setSelection] = useState(selectionInit.event);

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      />
      <DatePicker date={date} onDateChange={setDate} />
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
