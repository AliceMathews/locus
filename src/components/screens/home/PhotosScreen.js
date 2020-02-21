import React, { useState, useEffect } from "react";
import { Text, View, Button, FlatList, Dimensions, Image, ActivityIndicator } from "react-native";
import { Tile } from "react-native-elements";

import axios from "axios";

import styles from "./PhotosScreenStyle";
import { API_URL } from "../../../../configKeys";

import PhotoTile from './PhotoTile';

export default function PhotosScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}categories/${categoryId}/images`).then(res => {
      setImages(res.data.images);
      setLoading(false);
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    axios.get(`${API_URL}categories/${categoryId}/images`).then(res => {
      setImages(res.data.images);
      setRefreshing(false);
    });
  };

  const deviceWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Text style={styles.categoryTitle}>Photos of {route.params.categoryName}</Text>
      </View>
      <View style={styles.photosContainer}>
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        {!loading && (
          <FlatList
            numColumns={2}
            data={images}
            renderItem={({ item }) => (
              <PhotoTile
                  item={item}
                  navigation={navigation}
                  deviceWidth={deviceWidth}
              />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}  
      </View>
    </View>
  );
}
