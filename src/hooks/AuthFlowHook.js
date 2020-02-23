import { useEffect, useReducer, useMemo } from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { API_URL } from "../../configKeys";

const AuthFlowHook = () => {
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
      console.log("Something went wrong", err);
    }
  };

  const logoutFrontend = async () => {
    console.log("starting frontend logout");
    try {
      await AsyncStorage.removeItem("userToken");
      console.log("Auth token removed");
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  const logout = async () => {
    return Promise.all([logoutBackend(), logoutFrontend()]);
  };

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
        const res = await axios.get(`${API_URL}users/myinfo`, {
          headers: { authorization: userToken }
        });
        if (res.data) {
          dispatch({ type: "RESTORE_TOKEN", token: userToken });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
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
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // };

  return { state, authContext, logout };
};

export default AuthFlowHook;
