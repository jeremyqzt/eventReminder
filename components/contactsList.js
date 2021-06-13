import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import ContactItem from "./contactItem";

const ContactsList = (props) => {
  const allContactIds = props.contacts.allIds || [];
  const allContactByIds = props.contacts.byId || {};

  return (
    <View>
      {allContactIds.map((contact, index) => {
        console.log(allContactByIds[contact]);
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
