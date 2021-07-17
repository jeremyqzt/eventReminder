import React, { useState, useCallback, useEffect } from "react";
import {
  ListItem,
  Text,
  Input,
  Icon,
  Button,
  Avatar,
} from "react-native-elements";
import { View, TextInput } from "react-native";

import { styles } from "./styles";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import { deleteEvent, updateEvent } from "../actions/actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment-lunar";

import { constGetNextOccurence } from "../utils/utils";
import {
  AvailableIcons,
  AvailableReoccurences,
  AvailableColors,
  Everyone,
  EventType,
} from "../utils/constants";

import DropDownPicker from "react-native-dropdown-picker";

const AddEventTile = (props) => {
  console.log(props);
  const [nextOccur, setNextOccur] = useState(0);
  const [text, setText] = useState("");

  const onChangeText = (newText) => {
    setText(newText);
  };
  // Reoccurence
  const [openRecurr, setOpenRecurr] = useState(false);
  const [valueRecurr, setValueRecurr] = useState(
    AvailableReoccurences[2].value
  );
  const availReoccurences = AvailableReoccurences.map((item, idx) => {
    return {
      ...item,
      index: idx,
      icon: () => (
        <Avatar
          size={"small"}
          title={item.indicator}
          overlayContainerStyle={{ backgroundColor: "white" }}
          activeOpacity={0.7}
        />
      ),
    };
  });
  const [itemsRecurr, setItemsRecurr] = useState([...availReoccurences]);

  // Event DateType
  const [openDateType, setopenDateType] = useState(false);
  const [valueDateType, setValueDateType] = useState(EventType[1].value);
  const availEventTypes = EventType.map((item, idx) => {
    return {
      ...item,
      index: idx,
      icon: () => (
        <Avatar
          size={"small"}
          title={item.indicator}
          overlayContainerStyle={{ backgroundColor: "white" }}
          activeOpacity={0.7}
        />
      ),
    };
  });
  const [itemsEventType, setItemsEventType] = useState([...availEventTypes]);

  // Contacts
  const [openContacts, setOpenContacts] = useState(false);
  const [valuesContacts, setValuesContacts] = useState([Everyone.value]);
  const availableContacts = (props.contacts.allIds || []).map((item) => {
    return {
      label: props.contacts.byId[item].firstName || "Skipped",
      value: item,
    };
  });
  const [itemsContacts, setItemContacts] = useState([
    Everyone,
    ...availableContacts,
  ]);

  useEffect(() => {
    setItemContacts([Everyone, ...availableContacts]);
  }, [props.contacts.allIds]);

  // Icons
  const [openIcon, setOpenIcon] = useState(false);
  const [valueIcon, setValueIcon] = useState(AvailableIcons[0].value);
  const availIcons = AvailableIcons.map((item) => {
    return {
      ...item,
      icon: () => (
        <Avatar
          size={"small"}
          icon={{
            name: item.value,
            color: `${AvailableColors[0].value}`,
            type: "font-awesome",
          }}
          overlayContainerStyle={{ backgroundColor: "white" }}
          activeOpacity={0.7}
        />
      ),
    };
  });
  const [itemsIcon, setItemsIcon] = useState(availIcons);

  // Colors
  const [openColor, setOpenColor] = useState(false);
  const [valueColor, setValueColor] = useState(AvailableColors[0].value);
  const availColors = AvailableColors.map((item) => {
    return {
      ...item,
      icon: () => (
        <Avatar
          rounded
          size={"small"}
          overlayContainerStyle={{ backgroundColor: `${item.value}` }}
          activeOpacity={0.7}
        />
      ),
    };
  });
  const [itemsColor, setItemsColor] = useState(availColors);

  const [expaneded, setExpanded] = useState(false);

  const [eventName, setEventName] = useState();

  const onEventTypeOpen = useCallback(() => {
    setOpenIcon(false);
    setOpenColor(false);
    setOpenRecurr(false);
  }, []);

  const onRecurrOpen = useCallback(() => {
    setOpenIcon(false);
    setOpenColor(false);
    setopenDateType(false);
  }, []);

  const onIconOpen = useCallback(() => {
    setOpenRecurr(false);
    setOpenColor(false);
    setopenDateType(false);
  }, []);

  const onColorOpen = useCallback(() => {
    setOpenRecurr(false);
    setOpenIcon(false);
    setopenDateType(false);
  }, []);

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

  const deleteEvent = () => {
    props.deleteEvent(props.event.id);
  };

  const saveEvent = () => {
    const updateEvent = {
      id: props.id,
      eventName,
      color: valueColor,
      icon: valueIcon,
      contacts: valuesContacts,
      reoccurence: valueRecurr,
      notes: text,
      type: valueDateType,
    };
    props.updateEvent(updateEvent);
    setExpanded(false);
  };

  return (
    <View>
      <ListItem
        id={props.event.id}
        bottomDivider
        onPress={() => setExpanded(!expaneded)}
        style={{
          ...styles.eventTile,
          borderColor: `${valueColor ? valueColor : AvailableColors[0].value}`,
        }}
      >
        <Avatar
          size={"medium"}
          icon={{
            name: valueIcon ? valueIcon : "calendar",
            color: `${valueColor ? valueColor : AvailableColors[0].value}`,
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
        <ListItem id={props.event.id + "2"} bottomDivider>
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
            <View
              style={[
                styles.eventOptContainer,
                { zIndex: 4000, zIndexInverse: 1000 },
              ]}
            >
              <View style={[styles.eventOptline]}>
                <Text style={{ width: "45%" }}>Select Event Icon:</Text>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <DropDownPicker
                    dropDownDirection="DOWN"
                    placeholder={"Icon"}
                    onOpen={onIconOpen}
                    style={{ height: 40 }}
                    zIndex={3000}
                    zIndexInverse={1000}
                    open={openIcon}
                    value={valueIcon}
                    items={itemsIcon}
                    setOpen={setOpenIcon}
                    setValue={setValueIcon}
                    setItems={setItemsIcon}
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.eventOptContainer,
                { zIndex: 3000, zIndexInverse: 2000 },
              ]}
            >
              <View style={[styles.eventOptline]}>
                <Text style={{ width: "45%" }}>Select Event Type:</Text>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <DropDownPicker
                    dropDownDirection="DOWN"
                    placeholder={"Type"}
                    onOpen={onEventTypeOpen}
                    style={{ height: 40 }}
                    zIndex={2000}
                    zIndexInverse={2000}
                    open={openDateType}
                    value={valueDateType}
                    items={itemsEventType}
                    setOpen={setopenDateType}
                    setValue={setValueDateType}
                    setItems={setItemsEventType}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                styles.eventOptContainer,
                { zIndex: 2000, zIndexInverse: 3000 },
              ]}
            >
              <View style={[styles.eventOptline]}>
                <Text style={{ width: "45%" }}>Select Event Reoccurence:</Text>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <DropDownPicker
                    dropDownDirection="DOWN"
                    placeholder={"Reoccurence"}
                    onOpen={onRecurrOpen}
                    style={{ height: 40 }}
                    zIndex={2000}
                    zIndexInverse={2000}
                    open={openRecurr}
                    value={valueRecurr}
                    items={itemsRecurr}
                    setOpen={setOpenRecurr}
                    setValue={setValueRecurr}
                    setItems={setItemsRecurr}
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.eventOptContainer,
                { zIndex: 1000, zIndexInverse: 4000 },
              ]}
            >
              <View style={[styles.eventOptline]}>
                <Text style={{ width: "45%" }}>Select Event Color:</Text>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <DropDownPicker
                    dropDownDirection="DOWN"
                    placeholder={"Color"}
                    onOpen={onColorOpen}
                    style={{ height: 40 }}
                    zIndex={1000}
                    zIndexInverse={3000}
                    open={openColor}
                    value={valueColor}
                    items={itemsColor}
                    setOpen={setOpenColor}
                    setValue={setValueColor}
                    setItems={setItemsColor}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.contactsContainer]}>
              <Text style={{ width: "100%", marginBottom: 5 }}>
                Apply Event To:
              </Text>
              <DropDownPicker
                placeholder={"Pick some contacts..."}
                onOpen={onColorOpen}
                style={{ height: 40, width: "100%" }}
                searchable
                listMode="MODAL"
                mode="BADGE"
                multiple={true}
                min={0}
                max={99}
                zIndex={100}
                zIndexInverse={4000}
                open={openContacts}
                value={valuesContacts}
                items={itemsContacts}
                setOpen={setOpenContacts}
                setValue={setValuesContacts}
                setItems={setItemContacts}
              />
            </View>
            <View style={[styles.extraNotesContainer]}>
              <Text style={{ width: "100%", marginBottom: 5 }}>
                Additional Notes:
              </Text>
              <TextInput
                style={styles.bulkInput}
                onChangeText={onChangeText}
                value={text}
                multiline
                placeholder="Enter Notes"
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
                onPress={deleteEvent}
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
                onPress={saveEvent}
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
    deleteEvent: (id) => dispatch(deleteEvent(id)),
    updateEvent: (event) => dispatch(updateEvent(event)),
  };
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
    contacts: state.contactsReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventTile);
