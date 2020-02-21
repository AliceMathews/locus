import React from "react";
import { Text, View, Image, Button, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./ProfileScreenStyle";
import { API_URL } from "../../../../configKeys";

export default function ProfileScreen({ logout }) {
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
