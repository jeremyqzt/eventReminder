import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

import { DefaultTheme, defaultContact } from "../utils/constants";
import { addContact } from "../actions/actions";

const HeadingText = (props) => {
  const textColor = props.darkMode ? styles.textDark : styles.textNormal;

  return (
    <View>
      <Text
        style={[tailwind("font-bold text-2xl"), textColor]}
      >{`Contacts`}</Text>
      <Text style={[tailwind("font-semibold"), textColor]}>
        {`Edit or update contacts`}
      </Text>
    </View>
  );
};

const HeadingImage = (props) => {
  const textColor = props.darkMode ? styles.textNormal : styles.textDark;
  const iconColor = props.darkMode
    ? DefaultTheme.normalMode.text
    : DefaultTheme.darkMode.text;

  const addContact = () => {
    //console.log(defaultContact);
    console.log(props);
    props.addContact(defaultContact);
  };

  return (
    <View style={tailwind("items-center rounded px-1 py-1")}>
      <Button
        icon={<Icon name="user-plus" size={15} color={iconColor} />}
        buttonStyle={props.darkMode ? styles.buttonDark : styles.buttonNormal}
        title=" Add Contact"
        titleStyle={textColor}
        raised
        onPress={addContact}
      />
    </View>
  );
};

const HeadingContact = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          tailwind("px-5 py-1 flex-row flex justify-between items-center"),
          styles.header,
        ]}
      >
        <HeadingText darkMode={props.darkMode} />
        <HeadingImage darkMode={props.darkMode} addContact={props.addContact} />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNormal: {
    backgroundColor: DefaultTheme.darkMode.background,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  buttonDark: {
    backgroundColor: DefaultTheme.normalMode.background,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  textDark: {
    color: DefaultTheme.darkMode.text,
  },
  textNormal: {
    color: DefaultTheme.normalMode.text,
  },
  headerContainer: {
    marginBottom: 0,
  },
  header: {
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadingContact);
