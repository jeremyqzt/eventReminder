import * as React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { TouchableHighlight, View } from "react-native";
import { Text, StyleSheet } from "react-native";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

export const ContactItem = (props) => {
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
      <ListItem key={1} bottomDivider>
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
          name="chevron-down"
          size={20}
          color={iconColor}
        ></ListItem.Chevron>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
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
