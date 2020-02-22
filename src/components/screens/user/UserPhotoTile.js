import React from "react";
import { Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";

import styles from './UserPhotoTileStyle';

export default function UserPhotoTile(props) {
  return (
    <View>
      {props.onlyOne && (
        <ImageBackground
          key={props.item.id}
          source={{uri: props.item.url,
                  cache: "force-cache"}}
          style={{width: props.deviceWidth, height: props.deviceWidth, ...styles.image}}
        ></ImageBackground>
      )}
      {!props.onlyOne && (
        <ImageBackground
          key={props.item.id}
          source={{uri: props.item.url,
                  cache: "force-cache"}}
          style={{width: props.deviceWidth / 2, height: props.deviceWidth / 2, ...styles.image}}
        >
        </ImageBackground>
      )}     
    </View>
  );
}
