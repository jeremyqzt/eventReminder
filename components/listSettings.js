import React, { useState } from "react";

import { DefaultTheme } from "../utils/constants";
import { SafeAreaView } from "react-native";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  useColorScheme,
} from "react-native";
import { connect } from "react-redux";
import {
  settingsDarkMode,
  deleteAllContacts,
  deleteAllEvents,
  addContactNoUUID,
  addEvent,
  settingsCalendar,
  settingsNotifs,
  updateEvent,
  settingsNativeCalendar,
  settingsNativeCalendarId,
} from "../actions/actions";

import SettingsActionHeader from "./settingsActionHeader";
import SettingsResetHeader from "./settingsResetHeader";
import SettingsTestingHeader from "./settingsTestingHeader";

import SettingsToggle from "./toggle";
import SettingsButton from "./settingsButton";
import Toast from "react-native-root-toast";
import {
  AvailableColors,
  birthdayEmojis,
  AvailableReoccurences,
  EventType,
  AvailableIcons,
  TESTING,
} from "../utils/constants.js";

import {
  scheduleAllEventNotifs10Years,
  scheduleAllEventCalendar10Years,
} from "../utils/utils";
import * as Constants from "expo-constants";
import * as Contacts from "expo-contacts";
import * as Notifications from "expo-notifications";
import * as Calendar from "expo-calendar";

const SettingsList = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  const [realDarkMode, setDarkMode] = useState(props.darkMode);
  const [useCal, setUseCal] = useState(props.useCal);
  const [notifs, setNotifs] = useState(props.notifs);

  const toggleDarkMode = () => {
    setDarkMode(!realDarkMode);
    props.setDarkMode(!realDarkMode);
  };

  const toggleUseCal = () => {
    setUseCal(!useCal);
    props.setCalendar(!useCal);
  };

  const toggleNotifs = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    let text = "Notifications could not be enabled!";
    const currentNotifs = notifs;
    if (Constants.default.isDevice && status === "granted") {
      setNotifs(!notifs);
      text = "Notifications enabled!";
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
      await Notifications.cancelAllScheduledNotificationsAsync();
      const allEventById = props.events.byId || {};
      await scheduleAllEventNotifs10Years(allEventById, props.updateEvent);
      props.toggleNotifs(true);
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
      props.toggleNotifs(false);
    }
  };

  const syncCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (!(Constants.default.isDevice && status === "granted")) {
      return;
    }

    Alert.alert(
      "Create Calendar",
      "Creates a separate calendar with all current events. This can be deleted from your calendar app.",
      [
        {
          text: "Never Mind!",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Create",
          onPress: async () => {
            async function createCalendar() {
              const defaultCalendarSource = {
                isLocalAccount: true,
                name: "Reminder Calendar",
              };

              const newCalendarID = await Calendar.createCalendarAsync({
                title: "Reminder Calendar",
                color: "blue",
                entityType: Calendar.EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: "reminderCalendar",
                ownerAccount: "personal",
                accessLevel: Calendar.CalendarAccessLevel.OWNER,
              });
              return newCalendarID;
            }

            const calendarId = await createCalendar();
            props.settingsNativeCalendarId(calendarId);
            const allEventById = props.events.byId || {};
            const eventIds = await scheduleAllEventCalendar10Years(
              allEventById,
              calendarId
            );

            props.settingsNativeCalendar(eventIds);

            Toast.show("Calendar Events Synced!", {
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

  const importContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (!(Constants.default.isDevice && status === "granted")) {
      return;
    }

    Alert.alert(
      "Import Contacts",
      "Import all contacts from this phone. This may take a while!",
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
    schedule.setSeconds(schedule.getSeconds() + 10);
    console.log("Scheduling");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📬 This is a test",
        body: "Testing is being done here",
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

  const showAllNotifs = async () => {
    console.log("Finding notifs");
    Notifications.getAllScheduledNotificationsAsync().then((notifs) => {
      const normalNotifs = notifs.map((notif) => {
        return {
          title: notif.content.title,
          content: notif.content.body,
          date: notif.trigger,
        };
      });
      console.log(normalNotifs);
    });
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

  const deleteCalendar = async () => {
    Alert.alert(
      "Delete Calendar",
      "Removes the calendar and its associated events.",
      [
        {
          text: "Never Mind!",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            if (props.calendarId) {
              try {
                await Calendar.deleteCalendarAsync(props.calendarId);
              } catch {
                Toast.show(
                  "Something went wrong deleting the calendar (It is probably already deleted)!",
                  {
                    duration: Toast.durations.SHORT,
                    position: -100,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                  }
                );
                props.settingsNativeCalendarId(undefined);
                props.settingsNativeCalendar([]);
              }
              props.settingsNativeCalendarId(undefined);
              props.settingsNativeCalendar([]);

              Toast.show("Calendar and Events Removed!", {
                duration: Toast.durations.SHORT,
                position: -100,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
            } else {
              Toast.show("No Calendar Associated With This App!", {
                duration: Toast.durations.SHORT,
                position: -100,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
            }
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
            text={"Force Dark Mode"}
            subText={"Ignore OS settings and use dark mode."}
            value={realDarkMode}
            callback={toggleDarkMode}
          />
          <SettingsToggle
            text={"Use Overview"}
            subText={"Use overview cards on home page."}
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
            text={"Create Calendar"}
            title={"Create"}
            subText={"Create a calendar with all events."}
            callback={syncCalendar}
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
            text={"Remove Calendar"}
            title={"Remove"}
            subText={"Remove the calendar associated with this app."}
            callback={deleteCalendar}
          />
          {TESTING ? (
            <View>
              <SettingsTestingHeader />
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
                text={"Show Notifications"}
                title={"Show"}
                subText={"Press Me To console log notif."}
                callback={showAllNotifs}
              />
            </View>
          ) : null}
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
    toggleNotifs: (notif) => dispatch(settingsNotifs(notif)),
    setCalendar: (cal) => dispatch(settingsCalendar(cal)),
    updateEvent: (event) => dispatch(updateEvent(event)),
    settingsNativeCalendarId: (id) => dispatch(settingsNativeCalendarId(id)),
    settingsNativeCalendar: (calendar) =>
      dispatch(settingsNativeCalendar(calendar)),
  };
};

const mapStateToProps = (state) => {
  return {
    notifs: state.settingsReducer.notifs,
    darkMode: state.settingsReducer.darkMode,
    useCal: state.settingsReducer.useCalendar,
    calendarId: state.settingsReducer.calendarId,
    calendar: state.settingsReducer.calendar,
    contacts: state.contactsReducer,
    events: state.eventsReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
