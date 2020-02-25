import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";

import styles from "./CategoryTileStyle";

export default function CategoryTile(props) {
  return (
    <TouchableOpacity
      style={{ margin: 2 }}
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
          style={styles.categoryImage}
        >
          <View style={styles.categoryTextContainer}>
            <View style={styles.categoryTextBorder}>
              <Text style={styles.categoryText}>{props.item.name}</Text>
            </View>
          </View>
        </ImageBackground>
      )}
      {!props.oneItem && (
        <ImageBackground
          key={props.item.id}
          source={{uri: props.item.cover_photo_url,
                  cache: "force-cache"}}
          style={styles.categoryImage}
        >
          <View style={styles.categoryTextContainer}>
            <View style={styles.categoryTextBorder}>
              <Text style={styles.categoryText}>{props.item.name}</Text>
            </View>
          </View>
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
}
