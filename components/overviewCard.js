import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card, ListItem, Button } from "react-native-elements";

const OverviewCard = (props) => {
  return (
    <Card containerStyle={styles.card} style={styles.cardTitle}>
      <View style={styles.cardTitle}>
        <Text style={styles.titleText}>{"🎂 Birthdday"}</Text>
      </View>
      <Card.Divider />
      <View style={styles.item}>
        <Text style={styles.subItem}>{"🎉 Ben's Birthday is in 5 days"}</Text>
        <Text style={styles.subItemReminders}>
          {"         ⏰ Reminder: T-1"}
        </Text>
        <Text style={styles.subItemReminders}>
          {"         🌛 Event Type: Lunar"}
        </Text>
        <Text style={styles.subItemReminders}>
          {"         🎁 Present: Missing"}
        </Text>
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
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 7,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "800",
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
  subItem: {
    fontSize: 18,
    paddingVertical: 4,
    fontWeight: "500",
  },
  subItemReminders: {
    fontSize: 12,
    paddingVertical: 4,
  },
});

export default OverviewCard;
