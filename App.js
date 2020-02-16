import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "./src/components/home/HomeScreen";
import UploadScreen from "./src/components/upload/UploadScreen";
import UserScreen from "./src/components/user/UserScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Upload") {
              iconName = "add-a-photo";
            } else if (route.name === "User") {
              iconName = "person";
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="User" component={UserScreen}></Tab.Screen>
        <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
        <Tab.Screen name="Upload" component={UploadScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
