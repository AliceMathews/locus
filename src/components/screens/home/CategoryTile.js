import React from "react";
import { Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { SearchBar } from "react-native-elements";

import styles from "./CategoryTileStyle";
import Tile from './Tile';

export default function CategoryTile(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Photos", {
            categoryId: props.item.id,
            categoryName: props.item.name
        });
      }}
    >
      <ImageBackground
        key={props.item.id}
        source={{uri: props.item.cover_photo_url,
                cache: "force-cache"}}
        style={{width: props.deviceWidth / 2, height: props.deviceWidth / 2}}
      >
        <View style={styles.categoryTextContainer}>
          <Text
            style={styles.categoryText}
          >
            {props.item.name}
          </Text>
        </View>
      </ImageBackground>
      
    </TouchableOpacity>
  );
}
