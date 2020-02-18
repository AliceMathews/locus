import React from "react";
import { Text, View, Image } from "react-native";

import styles from "./ProfileScreenStyle";

export default function ProfileScreen({ currentUser }) {
  return (
    <View style={styles.container}>
      <Text>User Profile!</Text>
      {currentUser && (
        <>
          <Image
            source={{ uri: currentUser.profile_pic }}
            style={{ width: 300, height: 300 }}
          />
          <Text>{currentUser.username}</Text>
        </>
      )}
    </View>
  );
}
