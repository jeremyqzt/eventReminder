import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";

import Heading from "./components/header";
import UpcomingCard from "./components/upcomingCard";
import OverviewCard from "./components/overviewCard";
import NewContactModal from "./components/newContactModal";

import HR from "./components/hr";
import Icon from "react-native-vector-icons/Ionicons";

import MainPage from "./containers/mainPage";

import tailwind from "tailwind-rn";
import { getTheme } from "./utils/utils.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

const Tabs = AnimatedTabBarNavigator();

const colors = getTheme();
export default function App() {
  const actions = [
    {
      text: "Add a event",
      icon: <Icon name={"ios-calendar"} size={25} color={colors.colorful[0]} />,
      color: "#FFFFFF",
      name: "add_event",
      position: 1,
    },
    {
      text: "Add a contact",
      icon: (
        <Icon
          name={"person-circle-outline"}
          size={25}
          color={colors.colorful[1]}
        />
      ),
      color: "#FFFFFF",
      name: "add_contact",
      position: 2,
    },
    {
      text: "Import Contacts",
      icon: <Icon name={"ios-download"} size={25} color={colors.colorful[2]} />,
      color: "#FFFFFF",
      name: "import_contact",
      position: 2,
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const addCallBack = (name) => {
    switch (name) {
      case "add_contact":
        setModalVisible(!modalVisible);
      default:
        break;
    }
  };

  const getColor = (focused) => {
    return focused ? "white" : "black";
  };

  return (
    <>
      <NavigationContainer>
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: "white",
            inactiveTintColor: "black",
          }}
          appearence={{
            floating: true,
            tabBarBackground: "white",
            shadow: true,
            activeTabBackgrounds: "black",
          }}
        >
          <Tabs.Screen
            name="Home"
            component={MainPage}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name="home-outline"
                  size={size ? size : 24}
                  color={getColor(focused)}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Contacts"
            component={MainPage}
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
            component={MainPage}
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
            component={MainPage}
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
}
