import React from "react";
import { Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { SearchBar } from "react-native-elements";

import styles from "./CategoryTileStyle";

export default function PhotoTile(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Photo", {
            image: props.item
        });
      }}
    >
      <ImageBackground
        key={props.item.id}
        source={{uri: props.item.url,
                cache: "force-cache"}}
        style={{width: props.deviceWidth / 2, height: props.deviceWidth / 2}}
      >
      </ImageBackground>
    </TouchableOpacity>
  );
}
