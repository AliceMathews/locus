import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/user/ProfileScreen";
import LoginScreen from "../screens/user/LoginScreen";
import RegisterScreen from "../screens/user/RegisterScreen";

const UserStack = createStackNavigator();

export default function UserStackNav({ authContext, state }) {
  return (
    <UserStack.Navigator>
      {state.userToken ? (
        <UserStack.Screen name="Profile">
          {() => <ProfileScreen signOut={authContext.signOut} />}
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

      {/* <UserStack.Screen name="Register">
        {() => <RegisterScreen />}
      </UserStack.Screen> */}
    </UserStack.Navigator>
  );
}
