import React from "react";
import { Text, View, Image, Button, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./ProfileScreenStyle";

// const destoryToken = async () => {
//   try {
//     let userData = await AsyncStorage.getItem("userData");
//     let data = JSON.parse(userData);
//     const res = await axios.post("https://f17096c5.ngrok.io/api/users/logout", {
//       data
//     });
//     console.log(res);
//   } catch (err) {
//     console.log("Something went wrong", error);
//   }
// };

export default function ProfileScreen() {
  const navigation = useNavigation();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      console.log("Auth token removed");
      navigation.navigate("Login");
    } catch (err) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>User Profile!</Text>
      {false && (
        <>
          <Image
            source={{ uri: currentUser.profile_pic }}
            style={{ width: 300, height: 300 }}
          />
          <Text>{currentUser.username}</Text>
          <Button title="Sign out" onPress={logout}></Button>
        </>
      )}
      <Button title="Sign out" onPress={logout}></Button>
    </View>
  );
}
