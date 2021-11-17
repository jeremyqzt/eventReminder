import React from "react";

import { DefaultTheme } from "../utils/constants";

import { View, StyleSheet, Switch, Text, useColorScheme } from "react-native";
import { connect } from "react-redux";

const SettingsToggle = (props) => {
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
        <Switch
          style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
          trackColor={{
            false: DefaultTheme.normalMode.text,
            true: DefaultTheme.darkMode.kindaGreen,
          }}
          thumbColor={
            props.value
              ? DefaultTheme.normalMode.text
              : DefaultTheme.darkMode.text
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={props.callback}
          value={props.value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, null)(SettingsToggle);
