import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { MaterialIcons } from "@expo/vector-icons";

import CategoriesScreen from "./src/components/home/CategoriesScreen";
import PhotosScreen from "./src/components/home/PhotosScreen";
import DetailPhotoScreen from "./src/components/home/DetailPhotoScreen";
import FullPhotoScreen from "./src/components/home/FullPhotoScreen";

import UploadScreen from "./src/components/upload/UploadScreen";

import ProfileScreen from "./src/components/user/ProfileScreen";
import LoginScreen from "./src/components/user/LoginScreen";
import RegisterScreen from "./src/components/user/RegisterScreen";

const Tab = createBottomTabNavigator();
const UserStack = createStackNavigator();
const HomeStack = createStackNavigator();
const UploadStack = createStackNavigator();

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
        <Tab.Screen name="User">
          {() => (
            <UserStack.Navigator>
              <UserStack.Screen name="Profile" component={ProfileScreen} />
              <UserStack.Screen name="Login" component={LoginScreen} />
              <UserStack.Screen name="Register" component={RegisterScreen} />
            </UserStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Home">
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen
                name="Categories"
                component={CategoriesScreen}
              />
              <HomeStack.Screen name="Photos" component={PhotosScreen} />
              <HomeStack.Screen name="Photo" component={DetailPhotoScreen} />
              <HomeStack.Screen name="Photo-full" component={FullPhotoScreen} />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Upload">
          {() => (
            <UploadStack.Navigator>
              <UploadStack.Screen
                name="Upload Photo"
                component={UploadScreen}
              />
            </UploadStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
