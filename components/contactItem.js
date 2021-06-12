import React, { useState } from "react";
import { ListItem, Avatar, Input, Icon, Button } from "react-native-elements";
import { View } from "react-native";
import { styles } from "./styles";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";

const ContactItem = (props) => {
  const [expaneded, setExpanded] = useState(false);
  const defaultContact = {
    firstName: "Jeremy",
    lastName: "Qian",
  };

  const contact = props.contact ? props.contact : defaultContact;
  const iconColor = props.darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;

  return (
    <View>
      <ListItem key={1} bottomDivider onPress={() => setExpanded(!expaneded)}>
        <Avatar
          size={"medium"}
          icon={{
            name: "address-card",
            color: iconColor,
            type: "font-awesome",
          }}
          overlayContainerStyle={{ backgroundColor: "white" }}
          onPress={() => setExpanded(!expaneded)}
          activeOpacity={0.7}
        />
        <ListItem.Content>
          <ListItem.Title>{`${contact.firstName}, ${contact.lastName}`}</ListItem.Title>
          <ListItem.Subtitle>{contact.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          name={!expaneded ? "chevron-down" : "chevron-up"}
          size={16}
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
                placeholder="First Name"
                spellCheck={false}
                inputStyle={styles.inputStyle}
                autoCorrect={false}
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
                leftIconContainerStyle={styles.inputIconStyle}
                labelStyle={styles.inputLabelStyle}
                spellCheck={false}
                autoCorrect={false}
                placeholder="Last Name"
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
                placeholder="Describe This Person"
                inputStyle={styles.inputStyle}
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
                onPress={() => {}}
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
                onPress={() => {}}
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

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(ContactItem);
