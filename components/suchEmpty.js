import React from "react";
import { View, Image, StyleSheet, Text, useColorScheme } from "react-native";
import emptyLight from "../assets/empty.png";
import emptyDark from "../assets/empty-dark.png";

import treeLight from "../assets/tree.png";
import treeDark from "../assets/tree-dark.png";
import { DefaultTheme } from "../utils/constants";

const SuchEmptyWow = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  const tree = darkMode ? treeDark : treeLight;
  const empty = darkMode ? emptyDark : emptyLight;

  const type = Boolean(props.useTree) ? tree : empty;
  const h = Boolean(props.useTree) ? 250 : 200;
  const w = Boolean(props.useTree) ? 250 : 300;

  const textColor = darkMode
    ? DefaultTheme.darkMode.text
    : DefaultTheme.normalMode.text;

  const instructText = Boolean(props.useTree)
    ? "Add an contact or event to get started!"
    : "Add an entry to get started!";

  const styleBackground = darkMode ? styles.PageDark : styles.PageNormal;
  return (
    <View style={[styles.container, styleBackground]}>
      <Text style={[styles.text, { color: textColor }]}>
        Nothing To See Here...
      </Text>
      <Image
        source={type}
        style={{ width: w, height: h, marginVertical: 15 }}
      />
      <Text style={[styles.textSmall, { color: textColor }]}>
        {instructText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  PageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
  },
  PageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
  },
  container: {
    paddingVertical: 135,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "600",
  },
  textSmall: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default SuchEmptyWow;
