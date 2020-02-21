import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

import styles from "./LoginScreenStyle";

export default function LoginScreen({ signIn, signUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          onChangeText={text => setUsername(text)}
          value={username}
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
          disabled={!password || !username}
          style={styles.submitButton}
          onPress={() => signIn({ username, password })}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => signUp({ username, password })}
        >
          <Text style={styles.submitButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
