import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import FadeInView from "../../../global/FadeInView";

import styles from "./SavedStyle";

export default function ErrorTop(props) {
  return (
    <>
      <FadeInView duration={1000}>
        <View style={styles.container}>
          <MaterialIcons name={"error"} size={24} color={"#c25744"} />
          <Text style={styles.text}>Error Saving</Text>
        </View>
      </FadeInView>
    </>
  );
}
