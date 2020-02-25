import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import SplashScreen from "../splash/Splash";
import styles from "./LoginScreenStyle";

export default function LoginScreen({ signIn, signUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Animated.View
        style={{ opacity: fadeAnim, flex: 1, justifyContent: "center" }}
      >
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
        <TouchableOpacity style={styles.wrapper}>
          <TouchableOpacity
            disabled={!password || !username}
            style={styles.submitButton}
            onPress={() => signIn({ username, password })}
          >
            <Text style={styles.submitButtonText}>Login</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapper}>
          <TouchableOpacity
            disabled={!password || !username}
            style={styles.submitButton}
            onPress={() => signUp({ username, password })}
          >
            <Text style={styles.submitButtonText}>Sign up</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <SplashScreen />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
