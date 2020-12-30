import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";

import Heading from "./components/header";
import UpcomingCard from "./components/upcomingCard";
import OverviewCard from "./components/overviewCard";
import NewContactModal from "./components/newContactModal";

import SectionHeading from "./components/sectionHeading";
import HR from "./components/hr";
import Icon from "react-native-vector-icons/Ionicons";

import tailwind from "tailwind-rn";
import { getTheme } from "./utils/utils.js";

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
      icon: <Icon name={"ios-contact"} size={25} color={colors.colorful[1]} />,
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

  return (
    <>
      <SafeAreaView style={tailwind("flex")}>
        <Heading />
        <HR />
        <OverviewCard />
        <NewContactModal visible={modalVisible} addCallBack={addCallBack} />
      </SafeAreaView>
      <FloatingAction
        showBackground={false}
        shadow={{
          shadowOpacity: 0.35,
          shadowOffset: { width: 0, height: 3 },
          shadowColor: "#000000",
          shadowRadius: 3,
        }}
        actions={actions}
        color={colors.primary}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          addCallBack(name);
        }}
      />
    </>
  );
}
