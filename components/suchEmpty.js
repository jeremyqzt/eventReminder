import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import pixaBay from "../assets/pixabay.png";
import tree from "../assets/tree.png";

const SuchEmptyWow = (props) => {
  const type = props.useTree ? tree : pixaBay;
  const h = props.useTree ? 250 : 200;
  const w = props.useTree ? 250 : 300;

  const instructText = props.useTree
    ? "Add an contact or event to get started!"
    : "Add an entry to get started!";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nothing To See Here...</Text>
      <Image
        source={type}
        style={{ width: w, height: h, marginVertical: 15 }}
      />
      <Text style={styles.textSmall}>{instructText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
