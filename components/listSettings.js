import React, { useState } from "react";

import { DefaultTheme } from "../utils/constants";
import { SafeAreaView } from "react-native";
import { View, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import {
  settingsDarkMode,
  deleteAllContacts,
  deleteAllEvents,
  addContactNoUUID,
} from "../actions/actions";

import SettingsActionHeader from "./settingsActionHeader";
import SettingsToggle from "./toggle";
import SettingsButton from "./settingsButton";
import Toast from "react-native-root-toast";

import * as Permissions from "expo-permissions";
import * as Constants from "expo-constants";
import * as Contacts from "expo-contacts";

const SettingsList = (props) => {
  const [darkMode, setDarkMode] = useState(props.darkMode);
  const [notifs, setNotifs] = useState(props.notifs);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    props.setDarkMode(!darkMode);
  };

  const toggleNotifs = async () => {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    let text = "Notifications could not be enabled!";
    const currentNotifs = notifs;
    if (Constants.default.isDevice && result.status === "granted") {
      setNotifs(!notifs);
      text = "Notifications eanbled!";
    }

    if (!currentNotifs) {
      Toast.show(text, {
        duration: Toast.durations.SHORT,
        position: -100,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  const importContacts = async () => {
    let result = await Permissions.askAsync(Permissions.CONTACTS);
    if (!(Constants.default.isDevice && result.status === "granted")) {
      return;
    }

    Alert.alert(
      "Import Contacts",
      "Import all contacts from this phone.",
      [
        {
          text: "Never Mind!",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Import",
          onPress: async () => {
            const { data } = await Contacts.getContactsAsync({
              fields: [
                Contacts.Fields.FirstName,
                Contacts.Fields.LastName,
                Contacts.Fields.Company,
              ],
            });

            const today = new Date().toISOString().slice(0, 10);
            data.forEach((contact) => {
              const newContact = {
                firstName: contact.firstName,
                lastName: contact.lastName || "",
                description: `This contact was imported ${today}.`,
                id: contact.id,
              };

              if (!(contact.id in props.contacts.byId)) {
                props.addContact(newContact);
              }
            });
            Toast.show("All Contacts Imported!", {
              duration: Toast.durations.SHORT,
              position: -100,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteAllContacts = async () => {
    Alert.alert(
      "Delete Contacts",
      "Delete all contacts from this app.",
      [
        {
          text: "Never Mind!",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            props.deleteAllContacts();
            Toast.show("All Contacts Deleted!", {
              duration: Toast.durations.SHORT,
              position: -100,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteAllEvents = async () => {
    Alert.alert(
      "Remove Events",
      "Remove all events from this app.",
      [
        {
          text: "Never Mind!",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            props.deleteAllEvents();
            Toast.show("All Events Removed!", {
              duration: Toast.durations.SHORT,
              position: -100,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View
      style={darkMode ? styles.settingsPageDark : styles.settingsPageNormal}
    >
      <SafeAreaView>
        <SettingsToggle
          text={"Dark Mode"}
          subText={"Toggle between dark and light mode."}
          value={darkMode}
          callback={toggleDarkMode}
        />
        <SettingsToggle
          text={"Notify Me"}
          subText={"Create a notification on the day of the event."}
          value={notifs}
          callback={toggleNotifs}
        />
        <SettingsActionHeader />
        <SettingsButton
          text={"Import Contacts"}
          title={"Import"}
          subText={"Import contacts from your phone."}
          callback={importContacts}
        />
        <SettingsButton
          text={"Remove Events"}
          title={"Remove"}
          subText={"Permanently remove all events."}
          callback={deleteAllEvents}
        />
        <SettingsButton
          text={"Remove Contacts"}
          title={"Delete"}
          subText={"Permanently deletes all contacts."}
          callback={deleteAllContacts}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsPageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
  },
  settingsPageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
  },
  setting: {
    width: "100%",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDarkMode: (darkMode) => dispatch(settingsDarkMode(darkMode)),
    deleteAllEvents: () => dispatch(deleteAllEvents()),
    deleteAllContacts: () => dispatch(deleteAllContacts()),
    addContact: (contact) => dispatch(addContactNoUUID(contact)),
  };
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    contacts: state.contactsReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
