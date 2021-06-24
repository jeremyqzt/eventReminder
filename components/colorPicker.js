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
    props.onSelect(idx);
  };

  const availColors = props.availColors;

  return (
    <View style={styles.colorPicker}>
      <View style={styles.colorBoxContainerText}>
        <Text style={styles.tileHeader}>Select Color Code:</Text>
      </View>
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
    </View>
  );
};

export default ColorPicker;
