import * as React from "react";
import { connect } from "react-redux";
import ContactItem from "./contactItem";
import { StyleSheet, View, FlatList } from "react-native";

import SuchEmptyWow from "./suchEmpty";

const ContactsList = (props) => {
  const allContactIds = props.contacts.allIds || [];
  const allContactByIds = props.contacts.byId || {};

  if (allContactIds.length === 0) {
    return <SuchEmptyWow darkMode={props.darkMode} />;
  }

  return (
    <FlatList
      ItemSeparatorComponent={
        Platform.OS !== "android" &&
        (({ highlighted }) => (
          <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
        ))
      }
      data={allContactIds}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item, index }) => (
        <>
          <ContactItem contact={allContactByIds[item]} key={index} />
          {index + 1 === allContactIds.length ? (
            <View style={styles.flat}></View>
          ) : null}
        </>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    contacts: state.contactsReducer,
  };
};

const styles = StyleSheet.create({
  flat: {
    height: 250,
  },
});

export default connect(mapStateToProps, null)(ContactsList);
