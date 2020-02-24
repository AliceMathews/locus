import React from "react";
import { Image, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import header from "../../../assets/header.png";
import CategoriesScreen from "../screens/home/CategoriesScreen";
import PhotosScreen from "../screens/home/PhotosScreen";
import DetailPhotoScreen from "../screens/home/DetailPhotoScreen";
import FullPhotoScreen from "../screens/home/FullPhotoScreen";
import Chat from "../screens/chat/Chat";
const HomeStack = createStackNavigator();

export default function HomeStackNav({ token }) {
  return (
    <HomeStack.Navigator initialRouteName="Categories">
      {Platform.OS === "ios" ? (
        <HomeStack.Screen
          name="Categories"
          options={{
            headerTitle: (
              <Image
                source={header}
                style={{
                  alignSelf: "center",
                  resizeMode: "contain",
                  flex: 1
                }}
              />
            )
          }}
        >
          {() => <CategoriesScreen token={token} />}
        </HomeStack.Screen>
      ) : (
        <HomeStack.Screen name="Categories">
          {() => <CategoriesScreen token={token} />}
        </HomeStack.Screen>
      )}
      <HomeStack.Screen name="Photos" component={PhotosScreen} />
      <HomeStack.Screen name="Photo" component={DetailPhotoScreen} />
      <HomeStack.Screen name="Chat" component={Chat} />
      <HomeStack.Screen name="Photo-full" component={FullPhotoScreen} />
    </HomeStack.Navigator>
  );
}
