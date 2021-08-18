import React from "react";

import { DefaultTheme } from "../utils/constants";

import { View, StyleSheet, Button, Text } from "react-native";
import { connect } from "react-redux";

const SettingsButton = (props) => {
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
        <Text
          style={[
            styles.subText,
            {
              color: props.darkMode
                ? DefaultTheme.darkMode.text
                : DefaultTheme.normalMode.text,
            },
          ]}
        >
          {props.subText ? props.subText : ""}
        </Text>
      </View>
      <View style={styles.textAndSwitch}>
        <Button onPress={props.callback} title={props.title} />
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

export default connect(mapStateToProps, null)(SettingsButton);
