import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import Heading from './components/header';
import UpcomingCard from './components/upcomingCard';
import OverviewCard from './components/overviewCard';

import SectionHeading from './components/sectionHeading';
import HR from './components/hr';

import tailwind from 'tailwind-rn';

export default function App() {
  return (
    <SafeAreaView style={tailwind('flex')}>
      <Heading />
      <HR />
      <OverviewCard />
      <UpcomingCard />
      <UpcomingCard />
    </SafeAreaView>
  );
}
