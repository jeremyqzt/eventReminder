import React, { useState, useCallback, useEffect } from "react";
import Swipeout from "react-native-swipeout";
import { DatePicker } from "react-native-woodpicker";

import {
  ListItem,
  Text,
  Input,
  Icon,
  Button,
  Avatar,
} from "react-native-elements";
import { View, TextInput, Platform } from "react-native";
import { useColorScheme } from "../utils/utils";

import { styles } from "./styles";
import { connect } from "react-redux";
import { deleteEvent, updateEvent } from "../actions/actions";
import "moment-lunar";

import {
  getNextOccurence,
  getEqualGregorianDate,
  getEqualLunarDate,
  formatDate,
  scheduleNext10Years,
  cancelNotifs,
} from "../utils/utils";
import {
  DefaultTheme,
  AvailableIcons,
  AvailableReoccurences,
  AvailableColors,
  Everyone,
  EventType,
  PreReminderType,
  AdvancedReminderTypes,
  EVENT_SORT,
} from "../utils/constants";

import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-root-toast";

const AddEventTile = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;
  const sortType = props.sortType;

  const backGroundColor = darkMode
    ? DefaultTheme.darkMode.background
    : DefaultTheme.normalMode.background;

  const [text, setText] = useState(props.event?.notes || "");
  const onChangeText = (newText) => {
    setText(newText);
  };
  // Reoccurence
  const [openRecurr, setOpenRecurr] = useState(false);
  const [valueRecurr, setValueRecurr] = useState(props?.event?.reoccurence);

  // Pre-reminder
  const [openRemind, setOpenRemind] = useState(false);
  const [valueRemind, setValueRemind] = useState(
    props?.event?.remind || AdvancedReminderTypes.never
  );

  useEffect(() => {
    if (props.expand) {
      setExpanded(true);
      props.goEvents ? props.goEvents("-1") : null;
    }
  }, [props.expand]);

  const availReminds = PreReminderType.map((item, idx) => {
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
  const [reminds, setreminds] = useState([...availReminds]);

  // Event DateType
  const [openDateType, setopenDateType] = useState(false);
  const [valueDateType, setValueDateType] = useState(props?.event?.type);
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
      label: props.contacts.byId[item].firstName || "Name Not Available",
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
        label: props.contacts.byId[item].firstName || "Name Not Available",
        value: item,
      };
    });
    setItemContacts([Everyone, ...newContacts]);
  }, [props.contacts.allIds, props.contacts.byId]);

  // Colors
  const [openColor, setOpenColor] = useState(false);
  const [valueColor, setValueColor] = useState(props?.event?.color);
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

  const [expaneded, setExpanded] = useState(
    Boolean(props.expand || props.isDeepLinked)
  );

  const [eventName, setEventName] = useState(props?.event?.eventName);
  // Icons
  const [openIcon, setOpenIcon] = useState(false);
  const [valueIcon, setValueIcon] = useState(props?.event?.icon);
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
    setOpenRemind(false);
  }, []);

  const onRecurrOpen = useCallback(() => {
    setOpenIcon(false);
    setOpenColor(false);
    setopenDateType(false);
    setOpenRemind(false);
  }, []);

  const onIconOpen = useCallback(() => {
    setOpenRecurr(false);
    setOpenColor(false);
    setopenDateType(false);
    setOpenRemind(false);
  }, []);

  const onRemindsOpen = useCallback(() => {
    setOpenRecurr(false);
    setOpenColor(false);
    setopenDateType(false);
    setOpenIcon(false);
  }, []);

  const onColorOpen = useCallback(() => {
    setOpenRecurr(false);
    setOpenIcon(false);
    setopenDateType(false);
  }, []);

  const today = new Date();
  const eventDate = new Date(
    props?.event?.year,
    props?.event?.month,
    props?.event?.day
  );

  const [date, setDate] = useState(eventDate);

  const otherDate =
    valueDateType === EventType[0].value
      ? formatDate(getEqualGregorianDate(date))
      : formatDate(getEqualLunarDate(date));

  const todayTyped =
    valueDateType === EventType[0].value ? getEqualLunarDate(today) : today;
  const nextOccurDate = getNextOccurence(date, valueRecurr, todayTyped);
  const nextOccur = formatDate(nextOccurDate);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const iconColor = darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;

  const deleteEvent = async () => {
    if (props.notifs) await cancelNotifs(props?.event?.notifs || []);
    props.deleteEvent(props?.event?.id);
  };

  const swipeoutBtns = [
    {
      text: "Delete",
      onPress: () => deleteEvent(),
      type: "delete",
      autoClose: true,
    },
  ];

  const localEvent = {
    id: props?.event?.id,
    eventName,
    color: valueColor,
    icon: valueIcon,
    contacts: [...valuesContacts],
    reoccurence: valueRecurr,
    notes: text,
    type: valueDateType,
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    acknolwdged: props?.event?.acknolwdged || false,
    remind: valueRemind,
  };

  const saveEvent = async (showNotif) => {
    let scheduleNotifs = [];
    if (props.notifs) {
      await cancelNotifs(props?.event?.notifs || []);
      scheduleNotifs = await scheduleNext10Years(
        {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        },
        valueDateType,
        valueRecurr,
        localEvent
      );
    }

    const updateEvent = {
      ...localEvent,
      notifs: [...scheduleNotifs],
    };
    props.updateEvent(updateEvent);
    setExpanded(false);

    if (!showNotif) return;
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
    saveEvent(true);
  };

  const eventPassed = nextOccurDate < todayTyped;
  const sortHint =
    sortType.value === EVENT_SORT[1].value
      ? !eventPassed
        ? "Next Event: "
        : "📝 Event Passed: "
      : sortType.value === EVENT_SORT[2].value
      ? "Original Event: "
      : "";

  const sortHintDate =
    sortType.value === EVENT_SORT[1].value
      ? formatDate(nextOccurDate)
      : formatDate(date);

  const handleText = () => (date ? formatDate(date) : "No value Selected");

  const passedBackgroundColor =
    eventPassed && sortType.value === EVENT_SORT[1].value
      ? darkMode
        ? "#19181a"
        : "#dddddd"
      : backGroundColor;

  return (
    <Swipeout right={swipeoutBtns}>
      <View style={{ backgroundColor: backGroundColor, activeOpacity: 0.4 }}>
        <ListItem
          id={props?.event?.id}
          bottomDivider
          containerStyle={{ backgroundColor: passedBackgroundColor }}
          onPress={() => {
            if (expaneded) {
              saveEvent(false);
            }

            setExpanded(!expaneded);
          }}
          style={{
            ...styles.eventTile,
            borderColor: `${
              valueColor ? valueColor : AvailableColors[0].value
            }`,
          }}
        >
          <Avatar
            size={"medium"}
            icon={{
              name: valueIcon ? valueIcon : "calendar",
              color: `${valueColor ? valueColor : AvailableColors[0].value}`,
              type: "font-awesome",
            }}
            overlayContainerStyle={{ backgroundColor: passedBackgroundColor }}
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
              {eventName || "🧭 New Event"}
            </ListItem.Title>
            <ListItem.Subtitle
              style={{
                fontWeight: "normal",
                fontSize: 14,
                color: iconColor,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{ fontWeight: "200", color: iconColor }}
              >{`${sortHint}`}</Text>
              <Text style={{ color: iconColor }}>
                {`${sortHintDate} ${
                  valueDateType === EventType[0].value ? "(Lunar)" : ""
                }`}
              </Text>
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron size={22} color={iconColor}></ListItem.Chevron>
        </ListItem>
        {expaneded ? (
          <ListItem
            id={props?.event?.id + "2"}
            bottomDivider
            containerStyle={{ backgroundColor: backGroundColor }}
          >
            <ListItem.Content>
              <View style={styles.form}>
                <Input
                  inputContainerStyle={styles.inputContainer}
                  leftIconContainerStyle={styles.inputIconStyle}
                  placeholder={eventName || "🧭 Enter Event Name"}
                  value={eventName}
                  spellCheck={true}
                  inputStyle={{ ...styles.titleStyle, color: iconColor }}
                  autoCorrect={true}
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                  onChangeText={(e) => {
                    setEventName(e);
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
                <View
                  style={[
                    styles.iOsPickerContainer,
                    { backgroundColor: darkMode ? "black" : "white" },
                  ]}
                >
                  <>
                    <View
                      style={{
                        width: "100%",
                        height: 26,
                        paddingVertical: 3,
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center",
                        borderColor: "black",
                        borderRadius: 7,
                        paddingHorizontal: 5,
                        borderWidth: 1,
                        ...(darkMode
                          ? {
                              backgroundColor: "white",
                            }
                          : {}),
                      }}
                    >
                      <DatePicker
                        value={date}
                        onDateChange={onChange}
                        title={`Pick Event Date ${
                          valueDateType === EventType[0].value
                            ? "(Lunar)"
                            : "(Gregorian)"
                        }`}
                        text={handleText()}
                        isNullable={false}
                        iosMode="date"
                        iosDisplay="spinner"
                        androidDisplay="default"
                        style={{ color: "black" }}
                      />
                    </View>
                  </>
                </View>
              </View>
              <View style={styles.dateInformation}>
                <View style={styles.dateInformationText}>
                  <Icon
                    name={
                      valueDateType === EventType[1].value
                        ? "moon-o"
                        : "calendar"
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
              {props.notifs ? (
                <View
                  style={[
                    styles.eventOptContainer,
                    { zIndex: 5000, zIndexInverse: 1000 },
                  ]}
                >
                  <View style={[styles.eventOptline]}>
                    <Text style={{ width: "45%", color: iconColor }}>
                      Advanced Reminder:
                    </Text>
                    <View style={{ width: "50%", paddingRight: 5 }}>
                      <DropDownPicker
                        listMode={
                          Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"
                        }
                        scrollViewProps={{
                          nestedScrollEnabled: true,
                        }}
                        placeholder={"Icon"}
                        onOpen={onRemindsOpen}
                        style={{ height: 40 }}
                        zIndex={4000}
                        zIndexInverse={1000}
                        open={openRemind}
                        value={valueRemind}
                        items={reminds}
                        setOpen={setOpenRemind}
                        setValue={setValueRemind}
                        setItems={setreminds}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
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
                      listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
                      scrollViewProps={{
                        nestedScrollEnabled: true,
                      }}
                      searchable
                      placeholder={"Icon"}
                      onOpen={onIconOpen}
                      style={{ height: 40 }}
                      zIndex={4000}
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
                      listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
                      scrollViewProps={{
                        nestedScrollEnabled: true,
                      }}
                      placeholder={"Type"}
                      onOpen={onEventTypeOpen}
                      style={{ height: 40 }}
                      zIndex={3000}
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
                      listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
                      scrollViewProps={{
                        nestedScrollEnabled: true,
                      }}
                      placeholder={"Reoccurence"}
                      onOpen={onRecurrOpen}
                      style={{ height: 40 }}
                      zIndex={2000}
                      zIndexInverse={3000}
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
                      listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
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
                      zIndexInverse={4000}
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
                  zIndex={2}
                  zIndexInverse={4998}
                  min={0}
                  max={99}
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
                    color: !darkMode ? DefaultTheme.delete : "white",
                    type: "font-awesome",
                  }}
                  onPress={deleteEvent}
                  buttonStyle={{
                    ...styles.deleteButton,
                    backgroundColor: darkMode ? DefaultTheme.delete : "white",
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
    </Swipeout>
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
    notifs: state.settingsReducer.notifs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventTile);
