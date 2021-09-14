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
import { connect } from "react-redux";
import { deleteEvent, updateEvent } from "../actions/actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import "moment-lunar";

import {
  getNextOccurence,
  getEqualGregorianDate,
  getEqualLunarDate,
  formatDate,
} from "../utils/utils";
import {
  DefaultTheme,
  AvailableIcons,
  AvailableReoccurences,
  AvailableColors,
  Everyone,
  EventType,
} from "../utils/constants";

import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-root-toast";

const AddEventTile = (props) => {
  const backGroundColor = props.darkMode
    ? DefaultTheme.darkMode.background
    : DefaultTheme.normalMode.background;

  const [text, setText] = useState(props.event.notes);

  const onChangeText = (newText) => {
    setText(newText);
  };
  // Reoccurence
  const [openRecurr, setOpenRecurr] = useState(false);
  const [valueRecurr, setValueRecurr] = useState(props.event.reoccurence);
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
  const [valueDateType, setValueDateType] = useState(props.event.type);
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
    const newContacts = (props.contacts.allIds || []).map((item) => {
      return {
        label: props.contacts.byId[item].firstName || "Skipped2",
        value: item,
      };
    });
    setItemContacts([Everyone, ...newContacts]);
  }, [props.contacts.allIds, props.contacts.byId]);

  // Colors
  const [openColor, setOpenColor] = useState(false);
  const [valueColor, setValueColor] = useState(props.event.color);
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

  const [eventName, setEventName] = useState(props.event.eventName);
  // Icons
  const [openIcon, setOpenIcon] = useState(false);
  const [valueIcon, setValueIcon] = useState(props.event.icon);
  const availIcons = AvailableIcons.map((item) => {
    return {
      ...item,
      icon: () => (
        <Avatar
          size={"small"}
          icon={{
            name: item.value,
            color: `black`,
            type: "font-awesome",
          }}
          overlayContainerStyle={{ backgroundColor: "white" }}
          activeOpacity={0.7}
        />
      ),
    };
  });
  const [itemsIcon, setItemsIcon] = useState(availIcons);

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
  const eventDate = new Date(
    props.event.year,
    props.event.month,
    props.event.day
  );

  const [date, setDate] = useState(eventDate);

  const otherDate =
    valueDateType === EventType[0].value
      ? formatDate(getEqualGregorianDate(date))
      : formatDate(getEqualLunarDate(date));

  const todayTyped =
    valueDateType === EventType[0].value ? getEqualLunarDate(today) : today;
  const nextOccur = formatDate(
    getNextOccurence(eventDate, valueRecurr, todayTyped)
  );

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const iconColor = props.darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;

  const deleteEvent = () => {
    props.deleteEvent(props.event.id);
  };

  const saveEvent = () => {
    const updateEvent = {
      id: props.event.id,
      eventName,
      color: valueColor,
      icon: valueIcon,
      contacts: valuesContacts,
      reoccurence: valueRecurr,
      notes: text,
      type: valueDateType,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      acknolwdged: props.event.acknolwdged || false,
    };
    props.updateEvent(updateEvent);
    setExpanded(false);
    Toast.show(`${eventName} Saved!`, {
      duration: Toast.durations.SHORT,
      position: -100,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  const onSave = () => {
    saveEvent();
  };

  return (
    <View style={{ backgroundColor: backGroundColor }}>
      <ListItem
        id={props.event.id}
        bottomDivider
        containerStyle={{ backgroundColor: backGroundColor }}
        onPress={() => {
          if (expaneded) {
            saveEvent();
          }
          setExpanded(!expaneded);
        }}
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
          overlayContainerStyle={{ backgroundColor: backGroundColor }}
          onPress={() => setExpanded(!expaneded)}
          activeOpacity={0.7}
        />
        <ListItem.Content>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: iconColor,
            }}
          >
            {eventName || ""}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              fontWeight: "normal",
              fontSize: 14,
              color: iconColor,
            }}
          >{`${formatDate(date)} ${
            valueDateType === EventType[0].value ? "(Lunar)" : ""
          }`}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          name={!expaneded ? "chevron-down" : "chevron-up"}
          size={22}
          color={iconColor}
        ></ListItem.Chevron>
      </ListItem>
      {expaneded ? (
        <ListItem
          id={props.event.id + "2"}
          bottomDivider
          containerStyle={{ backgroundColor: backGroundColor }}
        >
          <ListItem.Content>
            <View style={styles.form}>
              <Input
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={styles.inputIconStyle}
                placeholder={eventName || "Event Name (E.g. 🥮 Moon Festival)"}
                spellCheck={false}
                inputStyle={{ ...styles.titleStyle, color: iconColor }}
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
              <Text style={{ ...styles.tileHeader, color: iconColor }}>
                Select Original Event Date:
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
                  name={
                    valueDateType === EventType[1].value ? "moon-o" : "calendar"
                  }
                  type="font-awesome"
                  size={12}
                  color={iconColor}
                />
                <Text style={{ color: iconColor }}>
                  {" "}
                  {valueDateType === EventType[1].value
                    ? "Equivalent Lunar Event:         " + `${otherDate}`
                    : "Equivalent Gregorian Event:  " + `${otherDate}`}
                </Text>
              </View>
              <View style={styles.dateInformationText}>
                <Icon
                  name="info-circle"
                  type="font-awesome"
                  size={12}
                  color={iconColor}
                />
                <Text style={{ color: iconColor }}>
                  {" "}
                  {`Next Event Occurence:          ${nextOccur} ${
                    valueDateType === EventType[0].value ? "(Lunar)" : ""
                  }`}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.eventOptContainer,
                { zIndex: 4000, zIndexInverse: 1000 },
              ]}
            >
              <View style={[styles.eventOptline]}>
                <Text style={{ width: "45%", color: iconColor }}>
                  Select Event Icon:
                </Text>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    searchable
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
                <Text style={{ width: "45%", color: iconColor }}>
                  Select Event Type:
                </Text>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
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
                <Text style={{ width: "45%", color: iconColor }}>
                  Select Event Reoccurence:
                </Text>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
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
                <Text style={{ width: "45%", color: iconColor }}>
                  Select Event Color:
                </Text>
                <View style={{ width: "50%", paddingRight: 5 }}>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    searchable
                    placeholder={"Color"}
                    onOpen={onColorOpen}
                    style={{
                      height: 40,
                    }}
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
              <Text
                style={{ width: "100%", marginBottom: 5, color: iconColor }}
              >
                Apply Event To:
              </Text>
              <DropDownPicker
                placeholder={"Pick some contacts..."}
                onOpen={onColorOpen}
                style={{
                  height: 40,
                  width: "100%",
                }}
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
              <Text
                style={{ width: "100%", marginBottom: 5, color: iconColor }}
              >
                Additional Notes:
              </Text>
              <TextInput
                style={{
                  ...styles.bulkInput,
                  backgroundColor: "white",
                }}
                onChangeText={onChangeText}
                value={text}
                multiline
                placeholder="Enter some notes..."
              />
            </View>
            <View style={[styles.form, styles.buttonRow]}>
              <Button
                type="outline"
                raised
                icon={{
                  name: "ban",
                  color: !props.darkMode ? DefaultTheme.delete : "white",
                  type: "font-awesome",
                }}
                onPress={deleteEvent}
                buttonStyle={{
                  ...styles.deleteButton,
                  backgroundColor: props.darkMode
                    ? DefaultTheme.delete
                    : "white",
                }}
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
                onPress={onSave}
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
