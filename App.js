import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import Heading from './components/header';
import UpcomingCard from './components/upcomingCard';
import OverviewCard from './components/overviewCard';
import { FloatingAction } from "react-native-floating-action";

import SectionHeading from './components/sectionHeading';
import HR from './components/hr';
import Icon from 'react-native-vector-icons/Ionicons';

import tailwind from 'tailwind-rn';

export default function App() {
  const actions = [
    {
      text: "Add a event",
      icon: <Icon name={"ios-calendar"}
      size={25}
      color={"#A4DEF9"} />,
      color: "#FFFFFF",
      name: "add_event",
      position: 1
    },
    {
      text: "Add a contact",
      icon: <Icon name={"ios-contact"}
      size={25}
      color={"#CFBAE1"} />,
      color: "#FFFFFF",
      name: "add_contact",
      position: 2
    },
    {
      text: "Import Contacts",
      icon: 
      <Icon name={"ios-download"}
        size={25}
        color={"#97F9F9"}
      />,
      color: "#FFFFFF",
      name: "import_contact",
      position: 2
    },
  ];

  return (
    <>
      <SafeAreaView style={tailwind('flex')}>
        <Heading />
        <HR />
        <OverviewCard />
      </SafeAreaView>
      <FloatingAction
        showBackground={false}
        shadow={{ shadowOpacity: 0.35, shadowOffset: { width: 0, height: 3 }, shadowColor: "#000000", shadowRadius: 3 }}
        actions={actions}
        color={"#176FA6"}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
      />
    </>
  );
}
