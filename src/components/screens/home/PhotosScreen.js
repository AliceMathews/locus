import React, { useState, useEffect } from "react";
import { Text, View, Button, FlatList, Dimensions, Image, ActivityIndicator } from "react-native";
import { Tile } from "react-native-elements";

import axios from "axios";

import styles from "./PhotosScreenStyle";
import { API_URL } from "../../../../configKeys";

export default function PhotosScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}categories/${categoryId}/images`).then(res => {
      setImages(res.data.images);
      setLoading(false);
    });
  }, []);

  const deviceWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Text>Photos</Text>
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
              <Tile
                key={item.id}
                imageSrc={{ uri: item.url }}
                featured
                onPress={() =>
                  navigation.navigate("Photo", {
                    image: item
                  })
                }
                width={deviceWidth / 2}
                height={deviceWidth / 2}
              />
            )}
          />
        )}  
      </View>
    </View>
  );
}
