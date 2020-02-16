import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import styles from "./UserScreenStyle";

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text>User Profile!</Text>
    </View>
  );
}
