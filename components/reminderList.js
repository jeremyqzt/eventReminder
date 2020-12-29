import React from "react";
import { Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ReminderList = (props) => {
  return (
    <ScrollView style={styles.scrollView}>
      <ReminderItem />
    </ScrollView>
  );
};

const ReminderItem = (props) => {
  return <Text style={styles.text}>Testing</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default ReminderList;
