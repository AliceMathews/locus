import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/user/ProfileScreen";
import LoginScreen from "../screens/user/LoginScreen";
import RegisterScreen from "../screens/user/RegisterScreen";

const UserStack = createStackNavigator();

export default function UserStackNav({ storeToken, getToken }) {
  return (
    <UserStack.Navigator initialRouteName="Profile">
      <UserStack.Screen name="Profile">
        {() => <ProfileScreen getToken={getToken} />}
      </UserStack.Screen>
      <UserStack.Screen name="Login">
        {() => <LoginScreen storeToken={storeToken} />}
      </UserStack.Screen>
      <UserStack.Screen name="Register">
        {() => <RegisterScreen storeToken={storeToken} />}
      </UserStack.Screen>
    </UserStack.Navigator>
  );
}
