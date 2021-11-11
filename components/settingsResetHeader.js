import React from "react";
import { Text, View, StyleSheet, useColorScheme } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";

import { DefaultTheme } from "../utils/constants";
import { addContact } from "../actions/actions";

const SettingsSubHeaderText = (props) => {
  const textColor = props.darkMode ? styles.textDark : styles.textNormal;

  return (
    <View>
      <Text style={[tailwind("font-bold text-2xl"), textColor]}>{`Reset`}</Text>
      <Text style={[tailwind("font-semibold"), textColor]}>
        {`Remove data from this application`}
      </Text>
    </View>
  );
};

const SettingsResetHeader = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          tailwind("px-5 py-1 flex-row flex justify-between items-center"),
          styles.header,
        ]}
      >
        <SettingsSubHeaderText darkMode={darkMode} />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNormal: {
    backgroundColor: DefaultTheme.darkMode.background,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  buttonDark: {
    backgroundColor: DefaultTheme.normalMode.background,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  textDark: {
    color: DefaultTheme.darkMode.text,
  },
  textNormal: {
    color: DefaultTheme.normalMode.text,
  },
  headerContainer: {
    marginBottom: 0,
  },
  header: {
    marginTop: 15,
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsResetHeader);
