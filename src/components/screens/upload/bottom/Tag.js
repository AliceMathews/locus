import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./TagStyle";

export default function Tag(props) {
  const name = props.tagName;
  return (
    <TouchableOpacity style={styles.tag} onPress={() => props.delete(name)}>
      <Text numberOfLines={1} style={styles.label}>
        {name}
      </Text>
      <MaterialIcons name={"cancel"} size={15} color={"grey"} />
    </TouchableOpacity>
  );
}
