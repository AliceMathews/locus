import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import FadeInView from "../../../global/FadeInView";

import styles from "./SavedStyle";

export default function SavedTop(props) {
  return (
    <>
      <FadeInView duration={1000}>
        <View style={styles.container}>
          <MaterialIcons name={"check-box"} size={24} color={"#44c26c"} />
          <Text style={styles.text}>Sucessfully saved</Text>
        </View>
      </FadeInView>
    </>
  );
}
