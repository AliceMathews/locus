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
            categoryName: props.item.name,
            token: props.token
        });
      }}
    >
      {props.oneItem && (
        <ImageBackground
          key={props.item.id}
          source={{uri: props.item.cover_photo_url,
                  cache: "force-cache"}}
          style={{width: props.deviceWidth, height: props.deviceWidth, ...styles.categoryImage}}
        >
          <View style={styles.categoryTextContainer}>
            <View style={styles.categoryTextBorder}>
              <Text
                style={styles.categoryText}
              >
                {props.item.name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      )}
      {!props.oneItem && (
        <ImageBackground
          key={props.item.id}
          source={{uri: props.item.cover_photo_url,
                  cache: "force-cache"}}
          style={{width: props.deviceWidth / 2, height: props.deviceWidth / 2, ...styles.categoryImage}}
        >
          <View style={styles.categoryTextContainer}>
            <View style={styles.categoryTextBorder}>
              <Text
                style={styles.categoryText}
              >
                {props.item.name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      )}  
    </TouchableOpacity>
  );
}
