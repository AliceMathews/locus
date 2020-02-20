import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";

// import styles from "./LiveSearchStyle";

export default function Tile(props, {navigation}) {
  console.log(`navigation ${navigation}`);
  return (
    <TouchableOpacity
      onPress={() => alert("hi")}
    >
      <Image
        key={props.item.id}
        source={{uri: props.item.cover_photo_url,
                cache: "force-cache"}}
        style={{width:200, height: 200}}
      />
    </TouchableOpacity>
  );
}
