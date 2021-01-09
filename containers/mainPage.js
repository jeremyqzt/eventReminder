import React from "react";

import Heading from "../components/header";
import OverviewCard from "../components/overviewCard";

import HR from "../components/hr";

import { getTheme } from "../utils/utils.js";
import { SafeAreaView } from "react-native";

const colors = getTheme();

export default function MainPage() {
  return (
    <SafeAreaView>
      <Heading />
      <HR />
      <OverviewCard />
    </SafeAreaView>
  );
}
