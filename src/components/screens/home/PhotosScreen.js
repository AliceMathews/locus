import React, { useState, useEffect } from "react";
import { Text, View, Button, FlatList, Dimensions, Image } from "react-native";
import { Tile } from "react-native-elements";

import axios from "axios";

import styles from "./PhotosScreenStyle";
import { API_URL } from "../../../../configKeys";

export default function PhotosScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}categories/${categoryId}/images`).then(res => {
      setImages(res.data.images);
    });
  }, []);

  const deviceWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: "https://locus-dev.s3-us-west-1.amazonaws.com/nsx.jpg"
          }}
          style={styles.banner}
        />
        <Text>The placeholder for Locus Logo</Text>
      </View>
      <View style={styles.photosContainer}>
        <Text>Photos for {categoryId}!</Text>
        {/* <Button
          title="Go to photo"
          onPress={() => {
            navigation.navigate("Photo");
          }}
        /> */}

        {/* <FlatList
          data={images}
          renderItem={({item}) => 
          {
            // <Tile
            //   key={item.id}
            //   imageSrc={{uri: item.url}}
            // />
            <Text>{item.id}</Text>
          }}
        /> */}

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
      </View>
    </View>
  );
}
