import * as React from "react";
import { connect } from "react-redux";
import ContactItem from "./contactItem";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { useColorScheme } from "../utils/utils";

import SuchEmptyWow from "./suchEmpty";
import { CONTACTS_SORT } from "../utils/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ContactsList = (props) => {
  const allContactIds = props.contacts.allIds || [];
  const allContactByIds = props.contacts.byId || {};
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  if (allContactIds.length === 0) {
    return (
      <ScrollView>
        <SuchEmptyWow darkMode={darkMode} />
      </ScrollView>
    );
  }

  const sortType = props.sortType;

  let sortedContactIds = [...allContactIds];
  switch (sortType.value) {
    case CONTACTS_SORT[0].value: {
      break;
    }
    case CONTACTS_SORT[1].value: {
      sortedContactIds.sort((aID, bID) => {
        const nameA = (allContactByIds[aID]?.firstName || "").toUpperCase();
        const nameB = (allContactByIds[bID]?.firstName || "").toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      });
      break;
    }
    default: {
      break;
    }
  }

  return (
    <KeyboardAwareScrollView extraHeight={300}>
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== "android" &&
          (({ highlighted }) => (
            <View
              style={[styles.separator, highlighted && { marginLeft: 0 }]}
            />
          ))
        }
        data={sortedContactIds}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <>
            <ContactItem contact={allContactByIds[item]} key={index} />
            {index + 1 === allContactIds.length ? (
              <View style={styles.flat}></View>
            ) : null}
          </>
        )}
      />
    </KeyboardAwareScrollView>
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
    height: 700,
  },
});

export default connect(mapStateToProps, null)(ContactsList);
