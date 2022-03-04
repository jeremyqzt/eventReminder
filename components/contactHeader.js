import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

import {
  DefaultTheme,
  defaultContact,
  CONTACTS_SORT,
} from "../utils/constants";
import { addContact } from "../actions/actions";

import { Picker } from "react-native-woodpicker";
import { useColorScheme } from "../utils/utils";

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
    props.addContact(defaultContact);
  };

  const contactSortOpts = CONTACTS_SORT;

  return (
    <View
      style={{
        overflow: "hidden",
        display: "flex",
        alignContent: "flex-end",
        width: "50%",
      }}
    >
      <Button
        icon={<Icon name="user-plus" size={15} color={iconColor} />}
        buttonStyle={props.darkMode ? styles.buttonDark : styles.buttonNormal}
        title=" Add Contact"
        titleStyle={textColor}
        onPress={addContact}
      />
      <View
        style={{
          overflow: "hidden",
          height: 35,
          marginTop: 5,
          display: "flex",
          alignContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: props.darkMode ? "white" : "black",
          }}
        >
          Sort By:
        </Text>
        <View
          style={{
            borderColor: "black",
            padding: 5,
            borderWidth: 1,
            position: "absolute",
            width: 110,
            alignItems: "center",
            borderRadius: 5,
            right: 0,
            ...(props.darkMode
              ? {
                  backgroundColor: "white",
                }
              : {}),
          }}
        >
          <Picker
            item={props.sortType}
            items={contactSortOpts}
            onItemChange={props.setSortType}
            mode="dropdown"
            placeholder={"Sort"}
          />
        </View>
      </View>
    </View>
  );
};

const HeadingContact = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  return (
    <>
      <View style={styles.headerContainer}>
        <View
          style={[
            tailwind("px-5 py-1 flex-row flex justify-between items-center"),
            styles.header,
          ]}
        >
          <HeadingText darkMode={darkMode} />
          <HeadingImage
            darkMode={darkMode}
            addContact={props.addContact}
            sortType={props.sortType}
            setSortType={props.setSortType}
          />
        </View>
        <Divider />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonNormal: {
    backgroundColor: "#558b2f",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  buttonDark: {
    backgroundColor: "#aed581",
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
