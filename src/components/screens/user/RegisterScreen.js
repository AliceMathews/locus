import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./RegisterScreenStyle";

export default function RegisterScreen({ storeToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const register = async (username, password) => {
    try {
      const res = await axios.post(
        "https://f17096c5.ngrok.io/api/users/register",
        {
          username,
          password
        }
      );
      await storeToken(res.data.auth_token);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
      Alert.alert("Username already taken");
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
          disabled={!password || !userName}
          style={styles.submitButton}
          onPress={() => (Keyboard.dismiss(), register(userName, password))}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
