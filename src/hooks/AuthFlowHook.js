import { useEffect, useReducer, useMemo } from "react";
import { AsyncStorage, Alert } from "react-native";
import axios from "axios";
import { API_URL } from "../../configKeys";

const storeToken = async token => {
  try {
    await AsyncStorage.setItem("userToken", JSON.stringify(token));
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

const logoutBackend = async () => {
  try {
    let userData = await AsyncStorage.getItem("userToken");
    let data = JSON.parse(userData);
    const res = await axios.post(`${API_URL}users/logout`, {
      data
    });
    console.log(res);
  } catch (err) {
    console.log("Something went wrong, backend", err);
  }
};

const logoutFrontend = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    console.log("Auth token removed");
  } catch (err) {
    console.log("Something went wrong, frontend", err);
  }
};

const logout = async () => {
  return Promise.all([logoutBackend(), logoutFrontend()]);
};

const AuthFlowHook = () => {
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
            userToken: action.token
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isLoading: false,
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      userToken: null
    }
  );
  useEffect(() => {
    const initialize = async () => {
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
        dispatch({ type: "SIGN_OUT" });
        // Restoring token failed
        // Redirect to "Login"
      }
    };
    initialize();
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
          dispatch({ type: "SIGN_IN", token: res.data.auth_token });
        } catch (err) {
          Alert.alert("Wrong Credentials");
        }
      },
      signOut: () => (dispatch({ type: "SIGN_OUT" }), logout()),
      signUp: async data => {
        try {
          const res = await axios.post(`${API_URL}users/register`, {
            username: data.username,
            password: data.password
          });
          await storeToken(res.data.auth_token);
          dispatch({ type: "SIGN_IN", token: res.data.auth_token });
        } catch (err) {
          Alert.alert("Username already taken");
        }
      }
    }),
    []
  );

  return { state, authContext };
};

export default AuthFlowHook;
