import React from "react";
import { Text, View, ImageBackground } from "react-native";

import styles from "./TileStyle";

export default function Tile(props) {
  return (
    <ImageBackground
      key={props.item.id}
      source={{ uri: props.item.cover_photo_url, cache: "force-cache" }}
      style={{ width: props.deviceWidth / 2, height: props.deviceWidth / 2 }}
    >
      {props.title && (
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryText}>{props.item.name}</Text>
        </View>
      )}
    </ImageBackground>
  );
}
