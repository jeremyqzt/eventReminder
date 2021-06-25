import React, { useState } from "react";
import {
  ListItem,
  Text,
  Input,
  Icon,
  Button,
  CheckBox,
  Avatar,
} from "react-native-elements";
import { View } from "react-native";
import { styles } from "./styles";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import { deleteContact, updateContact } from "../actions/actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import ColorPicker from "../components/colorPicker";
import moment from "moment";
import "moment-lunar";

import { constGetNextOccurence } from "../utils/utils";
import DropDownPicker from "react-native-dropdown-picker";

const AddEventTile = (props) => {
  const [nextOccur, setNextOccur] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const [expaneded, setExpanded] = useState(true);

  const [eventName, setEventName] = useState();
  const today = new Date();
  const todayLunar = moment()
    .year(today.getFullYear())
    .month(today.getMonth())
    .date(today.getDate())
    .lunar()
    .format("MMM, DD YYYY");

  const [date, setDate] = useState(today);
  const [lunarDateState, setLunarDate] = useState(todayLunar);

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    const lunarDate = moment()
      .year(currentDate.getFullYear())
      .month(currentDate.getMonth())
      .date(currentDate.getDate())
      .lunar()
      .format("MMM, DD YYYY");

    setLunarDate(lunarDate);

    setNextOccur(constGetNextOccurence(currentDate));
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

  const availableColors = [
    "#000000",
    "#EA80FC",
    "#6495ed",
    "#ff7f50",
    "#7fffd4",
    "#8fbc8f",
    "#ffd700",
    "red",
  ];

  const onSelectColor = (idx) => {
    setColorIdx(idx);
  };

  return (
    <View>
      <ListItem
        key={1}
        bottomDivider
        onPress={() => setExpanded(!expaneded)}
        style={{
          ...styles.eventTile,
          borderColor: `${availableColors[colorIdx]}`,
        }}
      >
        <Avatar
          size={"medium"}
          icon={{
            name: "heart",
            color: `${availableColors[colorIdx]}`,
            type: "font-awesome",
          }}
          overlayContainerStyle={{ backgroundColor: "white" }}
          onPress={() => setExpanded(!expaneded)}
          activeOpacity={0.7}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 20 }}>
            {eventName || ""}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{ fontWeight: "normal", fontSize: 14 }}
          >{`${"Event subtitle"}`}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          name={!expaneded ? "chevron-down" : "chevron-up"}
          size={22}
          color={iconColor}
        ></ListItem.Chevron>
      </ListItem>
      {expaneded ? (
        <ListItem key={2} bottomDivider>
          <ListItem.Content>
            <View style={styles.form}>
              <Input
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={styles.inputIconStyle}
                placeholder={eventName || "Event Name (E.g. 🥮 Moon Festival)"}
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
              <Text style={styles.tileHeader}>Select Event Date:</Text>
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
                  name="moon-o"
                  type="font-awesome"
                  size={12}
                  color={iconColor}
                />
                <Text>
                  {" "}
                  {"Equivalent Lunar Event:  "} {`${lunarDateState}`}
                </Text>
              </View>
              <View style={styles.dateInformationText}>
                <Icon
                  name="info-circle"
                  type="font-awesome"
                  size={12}
                  color={iconColor}
                />
                <Text> {`Next Event Occurence:    ${nextOccur}`} days</Text>
              </View>
            </View>
            <View style={[styles.colorPickerContainer, { zIndex: 10 }]}>
              <Text style={[styles.tileHeader, { zIndex: 10 }]}>
                Event Options:
              </Text>

              <DropDownPicker
                zIndex={3000}
                zIndexInverse={1000}
                open={open}
                value={value}
                items={items}
                searchable={true}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{ width: "48%" }}
              />
            </View>
            <View style={styles.colorPickerContainer}>
              <ColorPicker
                availColors={availableColors}
                onSelect={onSelectColor}
              />
            </View>

            <View style={[styles.form, styles.buttonRow]}>
              <Button
                type="outline"
                raised
                icon={{
                  name: "ban",
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
                title="Save Event"
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
