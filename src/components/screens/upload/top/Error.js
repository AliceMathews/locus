import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import styles from "./SavedStyle";

export default function ErrorTop(props) {
  return (
    <>
      <View style={styles.container}>
        <MaterialIcons name={"error"} size={24} color={"grey"} />
        <Text style={styles.text}>Error Saving</Text>
      </View>
    </>
  );
}
