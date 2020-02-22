import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import styles from "./EmptyStyle";

export default function EmptyTop(props) {
  return (
    <>
      <View style={styles.buttons}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={"library-add"}
            size={40}
            color={"grey"}
            onPress={() => props.press()}
          />
        </View>
        <Text style={styles.text}>Open Library</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={"add-a-photo"}
            size={36}
            color={"grey"}
            onPress={() => {
              props.pressCam();
            }}
          />
        </View>

        <Text style={styles.text}>Take Photo</Text>
      </View>
    </>
  );
}
