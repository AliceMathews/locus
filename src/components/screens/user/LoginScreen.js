import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../../configKeys";
import axios from "axios";

import styles from "./LoginScreenStyle";

export default function LoginScreen({ signIn }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  const navigation = useNavigation();
  const login = async (username, password) => {
    signIn({ username, password });
    // try {
    //   const res = await axios.post(`${API_URL}users/login`, {
    //     username,
    //     password
    //   });
    //   // await storeToken(res.data.auth_token);
    //   navigation.navigate("Home");
    // } catch (err) {
    //   // setError(err);
    //   Alert.alert("Wrong Credentials");
    // }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setUserName(text)}
          value={userName}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />

        <TouchableOpacity
          disabled={!password || !userName}
          style={styles.submitButton}
          onPress={() => (Keyboard.dismiss(), login(userName, password))}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.submitButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
