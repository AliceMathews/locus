import React, { useEffect, useReducer, useMemo, createContext } from "react";
import { AsyncStorage, Alert, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "./configKeys";
import AuthFlowHook from "./src/hooks/AuthFlowHook";
import axios from "axios";

import HomeStackNav from "./src/components/stackNavigators/HomeStackNav";
import UploadStackNav from "./src/components/stackNavigators/UploadStackNav";
import UserStackNav from "./src/components/stackNavigators/UserStackNav";
import SplashScreen from "./src/components/screens/splash/Splash";

const Tab = createBottomTabNavigator();

export default function App() {
  const { state, authContext } = AuthFlowHook();
  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

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
          activeTintColor: "#496382",
          inactiveTintColor: "#c5d5d6"
        }}
      >
        <Tab.Screen name="User">
          {() => <UserStackNav authContext={authContext} state={state} />}
        </Tab.Screen>
        <Tab.Screen name="Home">{() => <HomeStackNav token={state.userToken} />}</Tab.Screen>
        <Tab.Screen name="Upload">
          {() => <UploadStackNav token={state.userToken} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
