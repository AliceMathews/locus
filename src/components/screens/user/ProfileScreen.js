import React, { useState, useEffect } from "react";
import { Text, View, Image, Button } from "react-native";
import styles from "./ProfileScreenStyle";
import { API_URL } from "../../../../configKeys";
import axios from "axios";

export default function ProfileScreen({ signOut, user }) {
  return (
    <View style={styles.container}>
      {false && (
        <>
          <Image
            source={{ uri: user.profile_pic }}
            style={{ width: 300, height: 300 }}
          />
          <Text>{user.username}</Text>
          <Button title="Sign out" onPress={signOut}></Button>
        </>
      )}
      <Button title="Sign out" onPress={signOut}></Button>
    </View>
  );
}
