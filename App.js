import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //fetch session from AsyncStorage
    //fetch fonts and download any other assets
    //fetch user data
    (async () => {
      try {
        const res = await axios.get(
          "https://locus-api.herokuapp.com/api/users/3"
        );
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
    // return () => {
    //   cleanup
    // };
  }, []);

  // const _cacheResourcesAsync = async () => {
  //   const timer = await setTimeout(() => {
  //     console.log("hello from the otherside");
  //   }, 10000);
  //   return timer;
  // };

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
          {() => <UserStackNav currentUser={currentUser} />}
        </Tab.Screen>
        <Tab.Screen name="Home">{() => <HomeStackNav />}</Tab.Screen>
        <Tab.Screen name="Upload">{() => <UploadStackNav />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
