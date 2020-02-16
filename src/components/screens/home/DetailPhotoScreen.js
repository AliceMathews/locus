import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./DetailPhotoScreenStyle";

export default function DetailPhotoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Detailed Photo with map!</Text>
      <Button
        title="View fullscreen photo"
        onPress={() => navigation.navigate("Photo-full")}
      />
    </View>
  );
}
