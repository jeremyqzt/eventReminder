import React from "react";

import { DefaultTheme } from "../utils/constants";

import { View, StyleSheet, Switch, Text } from "react-native";
import { connect } from "react-redux";

const SettingsToggle = (props) => {
  return (
    <View style={styles.toggle}>
      <View style={styles.textAndSwitch}>
        <Text
          style={[
            styles.text,
            {
              color: props.darkMode
                ? DefaultTheme.darkMode.text
                : DefaultTheme.normalMode.text,
            },
          ]}
        >
          {props.text}
        </Text>
      </View>
      <View style={styles.textAndSwitch}>
        <Switch
          style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
          trackColor={{
            false: DefaultTheme.normalMode.text,
            true: DefaultTheme.darkMode.text,
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
    alignItems: "center",
  },
  textAndSwitch: {
    display: "flex",
  },
  text: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(SettingsToggle);
