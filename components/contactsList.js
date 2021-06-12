import * as React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import ContactItem from "./contactItem";

const ContactsList = (props) => {
  const allContacts = props.contacts || [];
  return (
    <View>
      {allContacts.map((contact, index) => {
        return <ContactItem contact={contact} key={index} />;
      })}
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
    contacts: state.contactsReducer.contacts,
  };
};

export default connect(mapStateToProps, null)(ContactsList);
