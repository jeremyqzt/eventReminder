import React from "react";

import { DefaultTheme } from "../utils/constants";

import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { useColorScheme } from "../utils/utils";

const SettingsButton = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  return (
    <View style={styles.toggle}>
      <View style={styles.textAndSwitch}>
        <Text
          style={[
            styles.text,
            {
              color: darkMode
                ? DefaultTheme.darkMode.text
                : DefaultTheme.normalMode.text,
            },
          ]}
        >
          {props.text}
        </Text>
        <Text
          style={[
            styles.subText,
            {
              color: darkMode
                ? DefaultTheme.darkMode.text
                : DefaultTheme.normalMode.text,
            },
          ]}
        >
          {props.subText ? props.subText : ""}
        </Text>
      </View>
      <View style={styles.textAndSwitch}>
        <TouchableOpacity onPress={props.callback}>
          <Text style={styles.btn}>{props.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 0,
    color: "#069",
  },
  toggle: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  textAndSwitch: {
    display: "flex",
  },
  text: {
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  subText: {
    textAlignVertical: "center",
    fontSize: 13,
    fontWeight: "400",
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(SettingsButton);
