import React, { useState } from "react";
import { ListItem, Avatar, Input, Icon, Button } from "react-native-elements";
import { View } from "react-native";
import { styles } from "./styles";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import { deleteContact, updateContact } from "../actions/actions";
import Toast from "react-native-root-toast";
import Swipeout from "react-native-swipeout";
import { useColorScheme } from "../utils/utils";

const ContactItem = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  const [expaneded, setExpanded] = useState(false);

  const [firstName, setFirstName] = useState(props.contact.firstName);
  const [lastName, setLastName] = useState(props.contact.lastName);
  const [description, setDescription] = useState(props.contact.description);

  const iconColor = darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;

  const backGroundColor = darkMode
    ? DefaultTheme.darkMode.background
    : DefaultTheme.normalMode.background;

  const deleteContact = () => {
    props.deleteContact(props.contact.id);
  };

  const saveContact = (notify) => {
    const updatedContact = {
      firstName: firstName,
      lastName: lastName,
      description: description,
      id: props.contact.id,
    };
    props.updateContact(updatedContact);

    if (!notify) return;

    Toast.show(`Contact: ${firstName} Saved!`, {
      duration: Toast.durations.SHORT,
      position: -100,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  const swipeoutBtns = [
    {
      text: "Delete",
      onPress: () => deleteContact(),
      type: "delete",
      autoClose: true,
    },
  ];

  return (
    <Swipeout right={swipeoutBtns}>
      <View style={{ backgroundColor: backGroundColor }}>
        <ListItem
          key={1}
          bottomDivider
          onPress={() => {
            if (expaneded) {
              saveContact(false);
            }

            setExpanded(!expaneded);
          }}
          containerStyle={{ backgroundColor: backGroundColor }}
          rightContent={
            <Button
              title="Delete"
              icon={{ name: "delete", color: "white" }}
              buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
            />
          }
        >
          <Avatar
            size={"medium"}
            icon={{
              name: "address-card",
              color: iconColor,
              type: "font-awesome",
            }}
            overlayContainerStyle={{ backgroundColor: backGroundColor }}
            activeOpacity={0.7}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{ fontWeight: "bold", fontSize: 20, color: iconColor }}
            >
              {firstName ? `${firstName} ${lastName || ""}` : "Enter a Name"}
            </ListItem.Title>
            <ListItem.Subtitle
              style={{ fontWeight: "normal", fontSize: 14, color: iconColor }}
            >{`${description || "Enter a description"}`}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron size={22} color={iconColor}></ListItem.Chevron>
        </ListItem>
        {expaneded ? (
          <ListItem
            containerStyle={{ backgroundColor: backGroundColor }}
            key={2}
            bottomDivider
          >
            <ListItem.Content>
              <View style={styles.form}>
                <Input
                  containerStyle={styles.input}
                  inputContainerStyle={styles.inputContainer}
                  leftIconContainerStyle={styles.inputIconStyle}
                  placeholder={"First Name"}
                  value={firstName}
                  spellCheck={false}
                  inputStyle={{ ...styles.inputStyle, color: iconColor }}
                  autoCorrect={false}
                  onChangeText={(value) => {
                    setFirstName(value);
                  }}
                  leftIcon={
                    <Icon
                      name="user"
                      type="font-awesome"
                      size={22}
                      color={iconColor}
                    />
                  }
                />
                <Input
                  containerStyle={styles.input}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ ...styles.inputStyle, color: iconColor }}
                  onChangeText={(value) => {
                    setLastName(value);
                  }}
                  leftIconContainerStyle={styles.inputIconStyle}
                  labelStyle={styles.inputLabelStyle}
                  spellCheck={false}
                  autoCorrect={false}
                  value={lastName}
                  placeholder={"Last Name"}
                  leftIcon={
                    <Icon
                      name="user-circle"
                      type="font-awesome"
                      size={22}
                      color={iconColor}
                    />
                  }
                />
              </View>
              <View style={styles.form}>
                <Input
                  inputContainerStyle={styles.inputContainer}
                  leftIconContainerStyle={styles.inputIconStyle}
                  placeholder={"Describe this person!"}
                  value={description}
                  inputStyle={{ ...styles.inputStyle, color: iconColor }}
                  onChangeText={(value) => {
                    setDescription(value);
                  }}
                  autoCorrect={false}
                  leftIcon={
                    <Icon
                      name="commenting"
                      type="font-awesome"
                      size={22}
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
                    color: !darkMode ? DefaultTheme.delete : "white",
                    type: "font-awesome",
                  }}
                  onPress={deleteContact}
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
                  title="Save"
                  type="outline"
                  raised
                  onPress={() => {
                    saveContact(true);
                    setExpanded(false);
                  }}
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
    deleteContact: (id) => dispatch(deleteContact(id)),
    updateContact: (contact) => dispatch(updateContact(contact)),
  };
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
