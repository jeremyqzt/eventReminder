import React from "react";

import Icon from "react-native-vector-icons/Ionicons";

import MainPage from "./containers/mainPage";
import SettingsPage from "./containers/settingsPage";
import EventsPage from "./containers/eventsPage";

import ContactsPage from "./containers/contactsPage";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { DefaultTheme } from "./utils/constants";
import { connect } from "react-redux";
import { useColorScheme } from "react-native";

const Tabs = AnimatedTabBarNavigator();

const TabsPage = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  const getColor = (focused) => {
    if (darkMode) {
      return focused
        ? DefaultTheme.darkMode.background
        : DefaultTheme.darkMode.text;
    }

    return focused
      ? DefaultTheme.normalMode.background
      : DefaultTheme.normalMode.text;
  };

  return (
    <>
      <NavigationContainer>
        <StatusBar
          backgroundColor={darkMode ? "black" : "white"}
          style={darkMode ? "light" : "dark"}
          translucent={false}
        />
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: darkMode ? "black" : "white",
            inactiveTintColor: darkMode ? "black" : "white",
          }}
          appearance={{
            tabBarBackground: darkMode
              ? DefaultTheme.offBlack
              : DefaultTheme.offWhite,
            activeTabBackgrounds: darkMode ? "white" : "black",
          }}
        >
          <Tabs.Screen
            name="Home"
            component={MainPage}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="home-outline"
                  size={24}
                  color={getColor(focused)}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Contacts"
            component={ContactsPage}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="people-outline"
                  size={24}
                  color={getColor(focused)}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Events"
            component={EventsPage}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="calendar-outline"
                  size={24}
                  color={getColor(focused)}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Settings"
            component={SettingsPage}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="settings-outline"
                  size={24}
                  color={getColor(focused)}
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(TabsPage);
