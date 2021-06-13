import React from "react";

import HeadingContact from "../components/contactHeader";

import { connect } from "react-redux";
import { DefaultTheme } from "../utils/constants";

import { SafeAreaView, ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import ContactsList from "../components/contactsList";

const ContactsPage = (props) => {
  return (
    <View style={props.darkMode ? styles.PageDark : styles.PageNormal}>
      <SafeAreaView>
        <HeadingContact />
        <ScrollView>
          <ContactsList />
          <View style={styles.flat} />
        </ScrollView>
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
  flat: {
    height: 125,
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(ContactsPage);
