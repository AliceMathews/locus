import React, { useEffect, useReducer, useMemo } from "react";
import { AsyncStorage, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppLoading } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "./configKeys";
import axios from "axios";

import HomeStackNav from "./src/components/stackNavigators/HomeStackNav";
import UploadStackNav from "./src/components/stackNavigators/UploadStackNav";
import UserStackNav from "./src/components/stackNavigators/UserStackNav";
import SplashScreen from "./src/components/screens/splash/Splash";

const Tab = createBottomTabNavigator();
// const AuthContext = React.createContext();

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: logout(),
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
        // After restoring token, we may need to validate it in production apps

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      } catch (e) {
        // Restoring token failed
        // Redirect to "Login"
      }
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        try {
          const res = await axios.post(`${API_URL}users/login`, {
            username: data.username,
            password: data.password
          });
          await storeToken(res.data.auth_token);
          // navigation.navigate("Home");
          dispatch({ type: "SIGN_IN", token: res.data.auth_token });
        } catch (err) {
          // setError(err);
          console.log("err", err);
          Alert.alert("Wrong Credentials");
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async data => {
        console.log(data);
        try {
          const res = await axios.post(`${API_URL}users/register`, {
            username: data.username,
            password: data.password
          });
          await storeToken(res.data.auth_token);
          // navigation.navigate("Home");
          dispatch({ type: "SIGN_IN", token: res.data.auth_token });
        } catch (err) {
          console.log(err);
          Alert.alert("Username already taken");
        }
      }
    }),
    []
  );

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
          activeTintColor: "tomato",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="User">
          {() => <UserStackNav authContext={authContext} state={state} />}
        </Tab.Screen>
        <Tab.Screen name="Home">{() => <HomeStackNav />}</Tab.Screen>
        <Tab.Screen name="Upload">{() => <UploadStackNav />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const storeToken = async token => {
  try {
    await AsyncStorage.setItem("userToken", JSON.stringify(token));
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
// const getToken = async () => {
//   try {
//     let userDataJSON = await AsyncStorage.getItem("userData");
//     let userData = JSON.parse(userDataJSON);
//     console.log("this is the auth token", userData);
//     setCurrentSession(userData);
//   } catch (error) {
//     console.log("Something went wrong", error);
//   }
// };

const logoutBackend = async () => {
  console.log("starting backend logout");
  try {
    let userData = await AsyncStorage.getItem("userToken");
    let data = JSON.parse(userData);
    const res = await axios.post(`${API_URL}users/logout`, {
      data
    });
    console.log(res);
  } catch (err) {
    console.log("Something went wrong", error);
  }
};

const logoutFrontend = async () => {
  console.log("starting frontend logout");
  try {
    await AsyncStorage.removeItem("userToken");
    console.log("Auth token removed");
  } catch (err) {
    console.log("Something went wrong", error);
  }
};

const logout = async () => {
  return Promise.all([logoutBackend(), logoutFrontend()]);
};
