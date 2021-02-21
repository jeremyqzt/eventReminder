import React, { useState } from "react";
import { ListItem, Avatar, Input } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";

export const ContactItem = (props) => {
  const [expaneded, setExpanded] = useState(false);
  const defaultContact = {
    name: "Jeremy Qian",
    subtitle: "💖 Anniversary in 7 days",
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
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <ListItem.Content>
          <ListItem.Title>{contact.name}</ListItem.Title>
          <ListItem.Subtitle>{contact.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          name={!expaneded ? "chevron-down" : "chevron-up"}
          size={20}
          color={iconColor}
        ></ListItem.Chevron>
      </ListItem>
      {expaneded ? (
        <ListItem key={2} bottomDivider>
          <ListItem.Content>
            <View style={styles.form}>
              <Input
                containerStyle={styles.inputs}
                placeholder="First Name"
                leftIcon={
                  <Icon
                    name="user"
                    type="font-awesome"
                    size={18}
                    color={iconColor}
                  />
                }
              />
              <Input
                containerStyle={styles.inputs}
                placeholder="Last Name"
                leftIcon={
                  <Icon
                    name="user-circle"
                    type="font-awesome"
                    size={18}
                    color={iconColor}
                  />
                }
              />
            </View>
          </ListItem.Content>
        </ListItem>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    width: "50%",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  PageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
  },
  PageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(ContactItem);
