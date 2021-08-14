import React, { useState } from "react";
import { ListItem, Avatar, Input, Icon, Button } from "react-native-elements";
import { View } from "react-native";
import { styles } from "./styles";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import { deleteContact, updateContact } from "../actions/actions";

const ContactItem = (props) => {
  const [expaneded, setExpanded] = useState(false);

  const [firstName, setFirstName] = useState(props.contact.firstName);
  const [lastName, setLastName] = useState(props.contact.lastName);
  const [description, setDescription] = useState(props.contact.description);

  const iconColor = props.darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;

  const backGroundColor = props.darkMode
    ? DefaultTheme.darkMode.background
    : DefaultTheme.normalMode.background;

  const deleteContact = () => {
    props.deleteContact(props.contact.id);
  };

  const saveContact = () => {
    const updatedContact = {
      firstName: firstName,
      lastName: lastName,
      description: description,
      id: props.contact.id,
    };
    props.updateContact(updatedContact);
    setExpanded(false);
  };

  return (
    <View style={{ backgroundColor: backGroundColor }}>
      <ListItem
        key={1}
        bottomDivider
        onPress={() => setExpanded(!expaneded)}
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
          onPress={() => setExpanded(!expaneded)}
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
                containerStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={styles.inputIconStyle}
                placeholder={firstName ? firstName : "First Name"}
                spellCheck={false}
                inputStyle={styles.inputStyle}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
