import React from "react";
import { Image, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import header from "../../../assets/header.png";
import ProfileScreen from "../screens/user/ProfileScreen";
import LoginScreen from "../screens/user/LoginScreen";
// import RegisterScreen from "../screens/user/RegisterScreen";

const UserStack = createStackNavigator();

export default function UserStackNav({ authContext, state }) {
  return (
    <UserStack.Navigator>
      {state.userToken ? (
        <UserStack.Screen
          name="Profile"
          // options={{
          //   headerTitle: (
          //     <View>
          //       <Image
          //         source={header}
          //         style={{
          //           alignSelf: "center",
          //           resizeMode: "contain",
          //           flex: 1
          //         }}
          //       />
          //     </View>
          //   )
          // }}
        >
          {() => (
            <ProfileScreen
              signOut={authContext.signOut}
              token={state.userToken}
            />
          )}
        </UserStack.Screen>
      ) : (
        <UserStack.Screen
          name="Login"
          // options={{
          //   headerTitle: (
          //     <View>
          //       <Image
          //         source={header}
          //         style={{
          //           alignSelf: "center",
          //           resizeMode: "contain",
          //           flex: 1
          //         }}
          //       />
          //     </View>
          //   )
          // }}
        >
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
