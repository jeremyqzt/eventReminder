import React, { useState } from "react";
import { ListItem, Text, Input, Icon } from "react-native-elements";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { DefaultTheme } from "../utils/constants";

const Square = (props) => {
  const borderColor = props.color === "#000000" ? "#6495ed" : "black";
  const outlined = props.selected ? { borderWidth: 2 } : {};
  return (
    <TouchableOpacity
      onPress={() => {
        props.onSelect(props.index);
      }}
      style={[
        styles.colorBox,
        { backgroundColor: props.color, ...outlined, borderColor },
      ]}
    >
      <View></View>
    </TouchableOpacity>
  );
};

const ColorPicker = (props) => {
  // const [color, setColor] = useState("#f0f8ff");
  const [selected, setSelected] = useState(0);
  const onSelect = (idx) => {
    setSelected(idx);
  };

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

  return (
    <View style={styles.colorBoxContainer}>
      {availColors.map((color, idx) => {
        return (
          <Square
            color={color}
            key={idx}
            index={idx}
            selected={selected === idx}
            onSelect={onSelect}
          />
        );
      })}
    </View>
  );
};

export default ColorPicker;
