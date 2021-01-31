import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";

import { DefaultTheme } from "../utils/constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { Divider } from "react-native-elements";

const SettingsMain = (props) => {
  const textColor = props.darkMode ? styles.textDark : styles.textNormal;
  return (
    <View>
      <Text style={[tailwind("font-bold text-2xl"), textColor]}>
        {"Settings"}
      </Text>
      <Text style={[tailwind("font-semibold"), textColor]}>
        {`Customize the application`}
      </Text>
    </View>
  );
};

const SettingsSecondary = (props) => {
  const textColor = props.darkMode ? "white" : "black";

  return (
    <View style={tailwind("items-center rounded px-1 py-1")}>
      <Icon name="cog" size={30} color={textColor} />
    </View>
  );
};

const SettingsHeading = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          tailwind("px-5 py-1 flex-row flex  justify-between items-center"),
          styles.header,
        ]}
      >
        <SettingsMain darkMode={props.darkMode} />
        <SettingsSecondary darkMode={props.darkMode} />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  textDark: {
    color: DefaultTheme.darkMode.text,
  },
  textNormal: {
    color: DefaultTheme.normalMode.text,
  },
  headerContainer: {
    marginBottom: 10,
  },
  header: {
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(SettingsHeading);
