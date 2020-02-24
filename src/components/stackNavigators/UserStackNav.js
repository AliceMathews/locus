import React from "react";
import { Image, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import header from "../../../assets/header.png";
import ProfileScreen from "../screens/user/ProfileScreen";
import LoginScreen from "../screens/user/LoginScreen";
// import RegisterScreen from "../screens/user/RegisterScreen";

const UserStack = createStackNavigator();

export default function UserStackNav({ authContext, state }) {
  console.log(state.userToken);
  return (
    <UserStack.Navigator>
      {state.userToken ? (
        <UserStack.Screen name="Profile">
          {() => (
            <ProfileScreen
              signOut={authContext.signOut}
              token={state.userToken}
            />
          )}
        </UserStack.Screen>
      ) : (
        <UserStack.Screen name="Login">
          {() => (
            <LoginScreen
              signIn={authContext.signIn}
              signUp={authContext.signUp}
            />
          )}
        </UserStack.Screen>
      )}
    </UserStack.Navigator>
  );
}
