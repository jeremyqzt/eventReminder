import React, { useState } from "react";

import HeadingContact from "../components/contactHeader";

import { connect } from "react-redux";
import { DefaultTheme } from "../utils/constants";

import { SafeAreaView } from "react-native";
import { View, StyleSheet, useColorScheme } from "react-native";
import ContactsList from "../components/contactsList";

const ContactsPage = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;
  const [sortType, setSortType] = useState(1);

  return (
    <View style={darkMode ? styles.PageDark : styles.PageNormal}>
      <SafeAreaView>
        <HeadingContact sortType={sortType} setSortType={setSortType} />
        <ContactsList sortType={sortType} />
      </SafeAreaView>
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

export default connect(mapStateToProps, null)(ContactsPage);
