import React from "react";

import Heading from "../components/header";
import OverviewCard from "../components/overviewCard";

import HR from "../components/hr";

import { getColorMode } from "../utils/utils.js";
import { ColorMode, DefaultTheme } from "../utils/constants";

import { SafeAreaView } from "react-native";
import { View, StyleSheet } from "react-native";

export default function MainPage() {
  return (
    <View style={styles.mainPage}>
      <SafeAreaView>
        <Heading />
        <OverviewCard />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    backgroundColor:
      getColorMode() === ColorMode.dark
        ? DefaultTheme.darkMode.main
        : DefaultTheme.normalMode.main,
    height: "100%",
  },
});
