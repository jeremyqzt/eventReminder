import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card, ListItem, Button } from "react-native-elements";

const OverviewCard = (props) => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>card</Card.Title>
      <Card.Divider />
      <View>
        <Text>{"HASDASDASD"}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    borderLeftWidth: 7,
    borderLeftColor: "red",
  },
  cardContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { x: 0, y: 10 },
    shadowOpacity: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OverviewCard;
