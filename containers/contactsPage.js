import React from "react";

import HeadingContact from "../components/contactHeader";

import { connect } from "react-redux";
import { DefaultTheme } from "../utils/constants";

import { SafeAreaView } from "react-native";
import { View, StyleSheet } from "react-native";
import ContactsList from "../components/contactsList";

const ContactsPage = (props) => {
  return (
    <View style={props.darkMode ? styles.PageDark : styles.PageNormal}>
      <SafeAreaView>
        <HeadingContact />
        <ContactsList />
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
