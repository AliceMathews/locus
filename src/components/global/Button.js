import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./ButtonStyle";

export default function CustomButton(props) {
  let styleType = "";
  if (props.type) {
    styleType = styles.buttonBig;
  } else {
    styleType = styles.button;
  }

  return (
    <TouchableOpacity
      style={{
        shadowColor: "#fff",
        shadowOffset: { width: -3, height: -3 },
        shadowOpacity: 0.74,
        shadowRadius: 3,
        elevation: 8
      }}
    >
      <TouchableOpacity style={styleType} onPress={props.onPress}>
        <Text style={styles.label}>{props.children}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
