import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./TagStyle";

export default function Tag(props) {
  const name = props.tagName;
  // return <Button title={props.tagName} onPress={() => props.delete(name)} />;
  return (
    <TouchableOpacity style={styles.tag} onPress={() => props.delete(name)}>
      <Text style={styles.label}>{name}</Text>
      <MaterialIcons name={"cancel"} size={15} color={"grey"} />
    </TouchableOpacity>
  );
}
