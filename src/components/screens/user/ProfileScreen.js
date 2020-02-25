import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions
} from "react-native";
import styles from "./ProfileScreenStyle";
import { API_URL } from "../../../../configKeys";
import axios from "axios";

import CustomButton from "../../global/Button";

import UserPhotoTile from "./UserPhotoTile";

export default function ProfileScreen({ signOut, user, token }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [oneItem, setOneItem] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}users/myinfo`, { headers: { authorization: token } })
      .then(res => {
        setCurrentUser(res.data);
        const userId = res.data.id;
        axios.get(`${API_URL}users/${userId}/images`).then(res => {
          setImages(res.data);
          setLoading(false);
          if (res.data.length === 1) {
            setOneItem(true);
          } else {
            setOneItem(false);
          }
        });
      });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    axios
      .get(`${API_URL}users/myinfo`, { headers: { authorization: token } })
      .then(res => {
        setCurrentUser(res.data);
        const userId = res.data.id;
        axios.get(`${API_URL}users/${userId}/images`).then(res => {
          setImages(res.data);
          setLoading(false);
          setRefreshing(false);
          if (res.data.length === 1) {
            setOneItem(true);
          } else {
            setOneItem(false);
          }
        });
      });
  };

  const deleteImage = id => {
    console.log("DELETING");
    axios
      .delete(`${API_URL}images/${id}`)
      .then(res => {
        // onRefresh();
        setImages(images.filter(image => image.id !== id));
      })
      .catch(e => console.log);
  };

  const deviceWidth = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      {!!currentUser && (
        <>
          <View style={styles.profileInfoContainer}>
            <Image
              source={{ uri: currentUser.profile_pic }}
              style={{ width: 120, height: 120 }}
            />
            <Text style={styles.userName}>{currentUser.username}</Text>
            <CustomButton onPress={signOut}>Sign out</CustomButton>
          </View>
          <View style={styles.userPhotosContainer}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {!loading && (
              <FlatList
                style={{ left: -2 }}
                numColumns={2}
                data={images}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  return (
                    <UserPhotoTile
                      item={item}
                      deviceWidth={deviceWidth}
                      oneItem={oneItem}
                      delete={deleteImage}
                    />
                  );
                }}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
}
