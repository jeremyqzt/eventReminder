import React, { useState } from "react";
import { ListItem, Text, Input, Icon, Button } from "react-native-elements";
import { View } from "react-native";
import { styles } from "./styles";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import { deleteContact, updateContact } from "../actions/actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import ColorPicker from "../components/colorPicker";

const AddEventTile = (props) => {
  const [expaneded, setExpanded] = useState(true);

  const [eventName, setEventName] = useState();
  const [lastName, setLastName] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const iconColor = props.darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;

  const deleteContact = () => {
    props.deleteContact(props.contact.id);
  };

  const saveContact = () => {
    const updateEvent = {
      eventName,
      id: props.id,
    };
    props.updateContact(updateEvent);
    setExpanded(false);
  };

  return (
    <View>
      {expaneded ? (
        <ListItem key={2} bottomDivider>
          <ListItem.Content>
            <View style={styles.form}>
              <Input
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={styles.inputIconStyle}
                placeholder={
                  eventName ? eventName : "Event Name (E.g. 🥮 Moon Festival)"
                }
                spellCheck={false}
                inputStyle={styles.titleStyle}
                autoCorrect={false}
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                }}
                onChangeText={(value) => {
                  setEventName(value);
                }}
                leftIcon={
                  <Icon
                    name="caret-right"
                    type="font-awesome"
                    size={14}
                    color={iconColor}
                  />
                }
              />
            </View>
            <View style={styles.datePicker}>
              <Text
                style={{
                  fontSize: 18,
                  marginRight: 5,
                }}
              >
                Select Event Date:
              </Text>
              <View style={styles.iOsPickerContainer}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  display="calendar"
                  style={styles.iOsPicker}
                  onChange={onChange}
                />
              </View>
            </View>
            <View style={styles.dateInformation}>
              <View style={styles.dateInformationText}>
                <Icon
                  name="info-circle"
                  type="font-awesome"
                  size={12}
                  color={iconColor}
                />
                <Text> {"Next Event Occurence:   "} 78 days</Text>
              </View>
              <View style={styles.dateInformationText}>
                <Icon
                  name="moon-o"
                  type="font-awesome"
                  size={12}
                  color={iconColor}
                />
                <Text> {"Equivalent Lunar Event:  "} Jun, 19 2021</Text>
              </View>
            </View>
            <View style={styles.form}>
              <ColorPicker />
            </View>
            <View style={styles.form}>
              <Input
                containerStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={styles.inputIconStyle}
                placeholder={eventName ? eventName : "First Name"}
                spellCheck={false}
                inputStyle={styles.inputStyle}
                autoCorrect={false}
                onChangeText={(value) => {
                  setEventName(value);
                }}
                leftIcon={
                  <Icon
                    name="user"
                    type="font-awesome"
                    size={14}
                    color={iconColor}
                  />
                }
              />
              <Input
                containerStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                onChangeText={(value) => {
                  setLastName(value);
                }}
                leftIconContainerStyle={styles.inputIconStyle}
                labelStyle={styles.inputLabelStyle}
                spellCheck={false}
                autoCorrect={false}
                placeholder={lastName ? lastName : "Last Name"}
                leftIcon={
                  <Icon
                    name="user-circle"
                    type="font-awesome"
                    size={14}
                    color={iconColor}
                  />
                }
              />
            </View>
            <View style={styles.form}>
              <Input
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={styles.inputIconStyle}
                placeholder={
                  description ? description : "Describe this person!"
                }
                inputStyle={styles.inputStyle}
                onChangeText={(value) => {
                  setDescription(value);
                }}
                autoCorrect={false}
                leftIcon={
                  <Icon
                    name="commenting"
                    type="font-awesome"
                    size={14}
                    color={iconColor}
                  />
                }
              />
            </View>
            <View style={[styles.form, styles.buttonRow]}>
              <Button
                type="outline"
                raised
                icon={{
                  name: "trash",
                  color: styles.deleteButtonIcon.backgroundColor,
                  type: "font-awesome",
                }}
                onPress={deleteContact}
                buttonStyle={styles.deleteButton}
                containerStyle={styles.buttonContainer}
              />
              <Button
                icon={{
                  name: "floppy-o",
                  color: styles.saveButtonIcon.backgroundColor,
                  type: "font-awesome",
                }}
                title="Save"
                type="outline"
                raised
                onPress={saveContact}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                containerStyle={styles.buttonContainer}
              />
            </View>
          </ListItem.Content>
        </ListItem>
      ) : null}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: (id) => dispatch(deleteContact(id)),
    updateContact: (contact) => dispatch(updateContact(contact)),
  };
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventTile);
