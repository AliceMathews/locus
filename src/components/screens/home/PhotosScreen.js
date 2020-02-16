import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./PhotosScreenStyle";

export default function PhotosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Photos!</Text>
      <Button
        title="Go to photo"
        onPress={() => {
          navigation.navigate("Photo");
        }}
      />
    </View>
  );
}
