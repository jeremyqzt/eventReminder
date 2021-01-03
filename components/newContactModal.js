import React, { useState } from "react";
import ImageAndPicker from "./imagePicker";
import ReminderList from "./reminderList";

import {
  TextInput,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import {
  getTheme,
  getName,
  getDefaults,
  checkValidEvents,
  checkValidContact,
} from "../utils/utils.js";
import { DateTypes } from "../utils/constants.js";

const colors = getTheme();

const NewContactModal = (props) => {
  const name = "add_contact";
  const defaultEvent = getDefaults();
  const [events, setEvent] = useState([defaultEvent]);
  const [contact, setContact] = useState({});

  const setImage = (image) => {
    setContact({ ...contact, imageURI: image });
  };

  const editEvent = (event, idx) => {
    const oldEvent = events[idx];
    const returnedTarget = Object.assign(oldEvent, event);

    const newEvents = [...events];
    newEvents[idx] = returnedTarget;
    setEvent(newEvents);
  };

  const addEvent = () => {
    setEvent([...events, defaultEvent]);
  };

  const removeEvent = (idx) => {
    let eventsCopy = [...events];
    eventsCopy.splice(idx, 1);
    setEvent(eventsCopy);
  };

  const saveEvent = () => {
    console.log(events);
    const valid = Boolean(
      checkValidEvents(events) && checkValidContact(contact)
    );
    if (valid) {
      //Do here
    }
    props.addCallBack(name);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.titleRow}>
              <Text style={styles.modalHeader}>Add Contact</Text>
              <TouchableHighlight
                onPress={() => {
                  props.addCallBack(name);
                }}
              >
                <Text style={styles.textStyle}>✖️</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.headerRow}>
              <Text style={styles.rowHeader}>📓Contact Information</Text>
            </View>
            <View style={styles.formRow}>
              <ImageAndPicker setImage={setImage} />
              <TextInput
                style={styles.formInput}
                placeholder="First Name"
                onChangeText={(text) => {
                  setContact({ ...contact, firstName: text });
                }}
                value={contact.firstName ? contact.firstName : undefined}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Last Name"
                onChangeText={(text) => {
                  setContact({ ...contact, lastName: text });
                }}
                value={contact.lastName ? contact.lastName : undefined}
              />
            </View>

            <View style={styles.headerRow}>
              <Text style={styles.rowHeader}>💡Events to Save</Text>
            </View>
            <View style={styles.formRow}>
              <ReminderList
                type={DateTypes.solar}
                addEvent={addEvent}
                events={events}
                deleteEvent={removeEvent}
                editEvent={editEvent}
              />
            </View>

            <View style={styles.headerRow}>
              <Text style={styles.rowHeader}>📋Contact Summary</Text>
            </View>
            <View style={styles.formRow}>
              <Text>
                {getName(contact.firstName, contact.lastName)
                  ? `${getName(
                      contact.firstName,
                      contact.lastName
                    )} will be saved into your contact book!`
                  : "Please enter a name!"}
              </Text>
            </View>

            <View style={styles.btnRow}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: colors.cancel }}
                onPress={() => {
                  props.addCallBack(name);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: colors.primary,
                }}
                underlayColor={colors.secondary}
                onPress={() => {
                  saveEvent();
                }}
              >
                <Text style={styles.textStyle}>Save Contact</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 22,
  },
  headerRow: {
    width: "100%",
    margin: 0,
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    marginBottom: 0,
    marginTop: 20,
  },
  titleRow: {
    width: "100%",
    margin: 0,
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  formInput: {
    width: "40%",
    paddingLeft: "1%",
    borderBottomWidth: 0.5,
  },
  formRow: {
    width: "100%",
    margin: 0,
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
    marginTop: 10,
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
    minWidth: "45%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "bold",
  },
  rowHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.heading2,
  },
});

export default NewContactModal;
