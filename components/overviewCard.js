import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressCircle from "react-native-progress-circle";
import HR from "./hr";
import { Card, ListItem, Button } from "react-native-elements";

const OverviewCard = (props) => {
  return (
    <Card>
      <Card.Title>card</Card.Title>
      <Card.Divider />
      <View>
        <Text>{"HASDASDASD"}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
