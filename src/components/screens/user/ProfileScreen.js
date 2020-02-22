import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, ActivityIndicator, FlatList, Dimensions } from "react-native";
import styles from "./ProfileScreenStyle";
import { API_URL } from "../../../../configKeys";
import axios from "axios";

import PhotoTile from '../home/PhotoTile';

export default function ProfileScreen({ signOut, user, token, navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}users/myinfo`, {headers: {"authorization": token}}).then(res => {
      setCurrentUser(res.data);
      const userId = res.data.id;
      axios.get(`${API_URL}users/${userId}/images`).then(res => {
        setImages(res.data);
        setLoading(false);
      })
    });
  }, []);
  console.log(images);

  const deviceWidth = Dimensions.get("window").width;

  return (
    <View style={{flex: 1}}>
      {currentUser && (
        <>
          <View style={styles.profileInfoContainer}>
            <Image
              source={{uri: currentUser.profile_pic}}
              style={{width: 80, height: 80}} 
            />
            <Text style={{textAlign: 'center'}}>{currentUser.username}</Text>
            <Button title="Sign out" onPress={signOut}></Button>
          </View>
          <View style={styles.userPhotosContainer}>
            {loading && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            {!loading && (
              <FlatList
                numColumns={2}
                data={images}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return (
                    <PhotoTile
                      item={item}
                      // navigation={navigation}
                      deviceWidth={deviceWidth}
                      oneItem={false}
                    />
                  );
                }}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
}
