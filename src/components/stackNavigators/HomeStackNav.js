import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CategoriesScreen from "../screens/home/CategoriesScreen";
import PhotosScreen from "../screens/home/PhotosScreen";
import DetailPhotoScreen from "../screens/home/DetailPhotoScreen";
import FullPhotoScreen from "../screens/home/FullPhotoScreen";
import Chat from "../screens/chat/Chat";

const HomeStack = createStackNavigator();

export default function HomeStackNav() {
  return (
    <HomeStack.Navigator initialRouteName="Categories">
      <HomeStack.Screen name="Categories" component={CategoriesScreen} />
      <HomeStack.Screen name="Photos" component={PhotosScreen} />
      <HomeStack.Screen name="Photo" component={DetailPhotoScreen} />
      <HomeStack.Screen name="Chat" component={Chat} />
      <HomeStack.Screen name="Photo-full" component={FullPhotoScreen} />
    </HomeStack.Navigator>
  );
}
