import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./ButtonStyle";

export default function CustomButton(props) {
  let styleType = "";
  if (props.type) {
    styleType = styles.buttonBig;
  } else {
    styleType = styles.button;
  }

  return (
    <TouchableOpacity style={styleType} onPress={props.onPress}>
      <Text style={styles.label}>{props.children}</Text>
    </TouchableOpacity>
  );
}
