import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./CategoriesScreenStyle";

export default function CategoriesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Categories!</Text>
      <Button
        title="Go to photos"
        onPress={() => navigation.navigate("Photos")}
      />
    </View>
  );
}
