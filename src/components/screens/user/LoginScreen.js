import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import axios from "axios";

import styles from "./LoginScreenStyle";

export default function LoginScreen() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (username, password) => {
    try {
      const res = await axios.post(
        "https://a9edfc48.ngrok.io/api/users/login",
        {
          username,
          password
        }
      );
    } catch {
      console.log;
    }
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
          style={styles.submitButton}
          onPress={() => (Keyboard.dismiss(), login(userName, password))}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
