import React, { useState, useEffect } from "react";
import { Text, View, Image, Button } from "react-native";
import styles from "./ProfileScreenStyle";
import { API_URL } from "../../../../configKeys";
import axios from "axios";

export default function ProfileScreen({ signOut, user, token }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    axios.get(`${API_URL}users/myinfo`, {headers: {"authorization": token}}).then(res => {
      setCurrentUser(res.data);
      console.log(res.data);
    });
  }, []);
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
      {currentUser && (
        <View>
          <Image
            source={{uri: currentUser.profile_pic}}
            style={{width: 100, height: 100}} 
          />
          <Text style={{textAlign: 'center'}}>{currentUser.username}</Text>
          <Button title="Sign out" onPress={signOut}></Button>
        </View>
      )}
    </View>
  );
}
