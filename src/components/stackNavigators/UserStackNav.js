import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/user/ProfileScreen";
import LoginScreen from "../screens/user/LoginScreen";
import RegisterScreen from "../screens/user/RegisterScreen";

const UserStack = createStackNavigator();

export default function UserStackNav() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="Profile" component={ProfileScreen} />
      <UserStack.Screen name="Login" component={LoginScreen} />
      <UserStack.Screen name="Register" component={RegisterScreen} />
    </UserStack.Navigator>
  );
}
