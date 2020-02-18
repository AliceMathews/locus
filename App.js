import React, { useEffect, useState } from "react";
import { View, Image, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppLoading } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import HomeStackNav from "./src/components/stackNavigators/HomeStackNav";
import UploadStackNav from "./src/components/stackNavigators/UploadStackNav";
import UserStackNav from "./src/components/stackNavigators/UserStackNav";

const Tab = createBottomTabNavigator();

export default function App() {
  const [currentSession, setCurrentSession] = useState(null);

  const storeToken = async token => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(token));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log("this is the auth token", data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

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
        <Tab.Screen name="User">
          {() => <UserStackNav storeToken={storeToken} getToken={getToken} />}
        </Tab.Screen>
        <Tab.Screen name="Home">{() => <HomeStackNav />}</Tab.Screen>
        <Tab.Screen name="Upload">{() => <UploadStackNav />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
