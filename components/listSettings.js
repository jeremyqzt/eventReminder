import React, { useState } from "react";

import { DefaultTheme } from "../utils/constants";
import { SafeAreaView } from "react-native";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  settingsDarkMode,
  deleteAllContacts,
  deleteAllEvents,
  addContactNoUUID,
  addEvent,
  settingsCalendar,
} from "../actions/actions";

import SettingsActionHeader from "./settingsActionHeader";
import SettingsResetHeader from "./settingsResetHeader";

import SettingsToggle from "./toggle";
import SettingsButton from "./settingsButton";
import Toast from "react-native-root-toast";
import {
  AvailableColors,
  birthdayEmojis,
  AvailableReoccurences,
  EventType,
  AvailableIcons,
} from "../utils/constants.js";

import * as Constants from "expo-constants";
import * as Contacts from "expo-contacts";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

const SETTINGS_TEST_TASK = "background-task-test";

const initBackground = async (interval = 5) => {
  try {
    console.log("Starting");
    await BackgroundFetch.registerTaskAsync(SETTINGS_TEST_TASK, {
      minimumInterval: interval, // in seconds
    });
  } catch (err) {
    console.log("registerTaskAsync() failed:", err);
  }
};

TaskManager.defineTask(SETTINGS_TEST_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Be sure to return the successful result type!
  return BackgroundFetch.Result.NewData;
});

const SettingsList = (props) => {
  const [darkMode, setDarkMode] = useState(props.darkMode);
  const [useCal, setUseCal] = useState(props.useCal);

  const [notifs, setNotifs] = useState(props.notifs);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    props.setDarkMode(!darkMode);
  };

  const toggleUseCal = () => {
    setUseCal(!useCal);
    props.setCalendar(!useCal);
  };

  const endBackground = async () => {
    await BackgroundFetch.unregisterTaskAsync(SETTINGS_TEST_TASK);
  };

  const toggleNotifs = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    let text = "Notifications could not be enabled!";
    const currentNotifs = notifs;
    if (Constants.default.isDevice && status === "granted") {
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
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const importContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (!(Constants.default.isDevice && status === "granted")) {
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

  const importEvents = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (!(Constants.default.isDevice && status === "granted")) {
      return;
    }

    Alert.alert(
      "Import Birthdays",
      "Import all birthdays based on contacts from this phone.",
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
                Contacts.Fields.Birthday,
              ],
            });
            const validData = data.filter(
              (item) => item.birthday !== undefined
            );
            console.log(validData);
            const today = new Date().toISOString().slice(0, 10);
            validData.forEach((contact) => {
              const newContact = {
                firstName: contact.firstName,
                lastName: contact.lastName || "",
                description: `This contact was imported ${today}.`,
                id: contact.id,
              };

              const newEvent = {
                eventName: `${
                  birthdayEmojis[
                    Math.floor(Math.random() * birthdayEmojis.length)
                  ]
                } ${contact.firstName}'s Birthday`,
                color:
                  AvailableColors[
                    Math.floor(Math.random() * AvailableColors.length)
                  ].value,
                icon: AvailableIcons[3].value,
                contacts: [contact.id],
                reoccurence: AvailableReoccurences[2].value,
                notes: `This event was imported ${today}.`,
                type: EventType[1].value,
                year: contact.birthday.year || 2000,
                month: contact.birthday.month || 0,
                day: contact.birthday.day || 1,
                acknolwdged: false,
                imported: true,
              };

              if (!(contact.id in props.contacts.byId)) {
                props.addContact(newContact);
              }

              props.addEvent(newEvent);
            });
            Toast.show("All Birthdays Imported!", {
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

  const testNotif = async () => {
    const schedule = new Date();
    schedule.setSeconds(schedule.getSeconds() + 3);
    console.log("Scheduling");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: {
        date: schedule,
      },
    });
  };

  const cancelAllNotif = async () => {
    Notifications.cancelAllScheduledNotificationsAsync();
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
    <ScrollView>
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
            text={"Use Calendar"}
            subText={"Use calendar view on home page."}
            value={useCal}
            callback={toggleUseCal}
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
            text={"Import Birthdays"}
            title={"Import"}
            subText={"Import birthdays from contacts."}
            callback={importEvents}
          />
          <SettingsButton
            text={"Sync Events"}
            title={"Sync"}
            subText={"Sync from this app to your calendar."}
            callback={importContacts}
          />
          <SettingsResetHeader />
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
          <SettingsButton
            text={"Test Notifications"}
            title={"Test"}
            subText={"Press Me To Test."}
            callback={testNotif}
          />
          <SettingsButton
            text={"Cancel All Notifications"}
            title={"Cancel"}
            subText={"Press Me To Test."}
            callback={cancelAllNotif}
          />
          <SettingsButton
            text={"Start Background"}
            title={"Start"}
            subText={"Press Me To Test."}
            callback={() => initBackground(5)}
          />
          <SettingsButton
            text={"End All Background"}
            title={"Cancel"}
            subText={"Press Me To Test."}
            callback={() => endBackground()}
          />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingsPageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
    paddingBottom: 200,
  },
  settingsPageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
    paddingBottom: 200,
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
    addEvent: (event) => dispatch(addEvent(event)),
    setCalendar: (cal) => dispatch(settingsCalendar(cal)),
  };
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    useCal: state.settingsReducer.useCalendar,
    contacts: state.contactsReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
