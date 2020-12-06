import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import Heading from './components/header';
import UpcomingCard from './components/upcomingCard';
import SectionHeading from './components/sectionHeading';
import HR from './components/hr';

import tailwind from 'tailwind-rn';

export default function App() {
  return (
    <SafeAreaView style={tailwind('flex')}>
      <Heading />
      <HR />
      <SectionHeading headingText={"Today's Events"} />
      <UpcomingCard />
    </SafeAreaView>
  );
}
