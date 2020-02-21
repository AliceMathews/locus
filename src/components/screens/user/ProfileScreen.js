import React from "react";
import { Text, View, Image, Button } from "react-native";
import axios from "axios";
import styles from "./ProfileScreenStyle";
import { API_URL } from "../../../../configKeys";

export default function ProfileScreen({ signOut }) {
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
          <Button title="Sign out" onPress={signOut}></Button>
        </>
      )}
      <Button title="Sign out" onPress={signOut}></Button>
    </View>
  );
}
