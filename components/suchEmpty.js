import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import pixaBay from "../assets/pixabay.png";

const SuchEmptyWow = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nothing To See Here...</Text>
      <Image source={pixaBay} style={{ width: 300, height: 200 }} />
      <Text style={styles.textSmall}>Add an entry to get started!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 155,
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
