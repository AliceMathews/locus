import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./PhotosScreenStyle";

export default function PhotosScreen({ route, navigation }) {
  const { categoryId } = route.params;
  return (
    <View style={styles.container}>
      <Text>Photos for {categoryId}!</Text>
      <Button
        title="Go to photo"
        onPress={() => {
          navigation.navigate("Photo");
        }}
      />
    </View>
  );
}
