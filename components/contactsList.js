import * as React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { TouchableHighlight, View } from "react-native";
import { Text, StyleSheet } from "react-native";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import ContactItem from "./contactItem";

export const ContactsList = () => {
  return (
    <View>
      <ContactItem />
    </View>
  );
};

const styles = StyleSheet.create({
  PageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
  },
  PageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(ContactsList);
