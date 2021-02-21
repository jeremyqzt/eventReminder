import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";

import { DefaultTheme } from "../utils/constants";

const HeadingText = (props) => {
  const textColor = props.darkMode ? styles.textDark : styles.textNormal;

  return (
    <View>
      <Text
        style={[tailwind("font-bold text-2xl"), textColor]}
      >{`Contacts`}</Text>
      <Text style={[tailwind("font-semibold"), textColor]}>
        {`Edit or update contacts`}
      </Text>
    </View>
  );
};

const HeadingImage = (props) => {
  const textColor = props.darkMode ? styles.textDark : styles.textNormal;

  return (
    <View style={tailwind("items-center rounded px-1 py-1")}>
      <Text
        style={[tailwind("font-bold text-xs"), textColor]}
      >{`No Events Today`}</Text>
    </View>
  );
};

const HeadingContact = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          tailwind("px-5 py-1 flex-row flex justify-between items-center"),
          styles.header,
        ]}
      >
        <HeadingText darkMode={props.darkMode} />
        <HeadingImage darkMode={props.darkMode} />
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
    marginBottom: 0,
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

export default connect(mapStateToProps, null)(HeadingContact);
