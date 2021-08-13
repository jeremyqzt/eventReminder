import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import ContactItem from "./contactItem";

import SuchEmptyWow from "./suchEmpty";

const ContactsList = (props) => {
  const allContactIds = props.contacts.allIds || [];
  const allContactByIds = props.contacts.byId || {};

  if (allContactIds.length === 0) {
    return <SuchEmptyWow darkMode={props.darkMode} />;
  }

  return (
    <View>
      {allContactIds.map((contact, index) => {
        return <ContactItem contact={allContactByIds[contact]} key={index} />;
      })}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    contacts: state.contactsReducer,
  };
};

export default connect(mapStateToProps, null)(ContactsList);
