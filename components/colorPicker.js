import React, { useState } from "react";
import { ListItem, Text, Input, Icon, Button } from "react-native-elements";
import { View } from "react-native";
import { styles } from "./styles";
import { DefaultTheme } from "../utils/constants";

const ColorPicker = (props) => {
  const [color, setColor] = useState("white");

  const availColors = [
    "#000000",
    "#f0f8ff",
    "#6495ed",
    "#ff7f50",
    "#7fffd4",
    "#8fbc8f",
    "#ffd700",
    "#ff6347",
  ];
  const Square = (prop) => {
    return (
      <View style={[styles.colorBox, { backgroundColor: prop.color }]}></View>
    );
  };
  return (
    <View style={styles.colorBoxContainer}>
      {availColors.map((color) => {
        return <Square color={color} />;
      })}
    </View>
  );
};

export default ColorPicker;
