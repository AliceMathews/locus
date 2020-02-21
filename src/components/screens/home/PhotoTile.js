import React from "react";
import { Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";

export default function PhotoTile(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Photo", {
            image: props.item
        });
      }}
    >
      {props.onlyOne && (
        <ImageBackground
          key={props.item.id}
          source={{uri: props.item.url,
                  cache: "force-cache"}}
          style={{width: props.deviceWidth, height: props.deviceWidth}}
        ></ImageBackground>
      )}
      {!props.onlyOne && (
        <ImageBackground
          key={props.item.id}
          source={{uri: props.item.url,
                  cache: "force-cache"}}
          style={{width: props.deviceWidth / 2, height: props.deviceWidth / 2}}
        >
        </ImageBackground>
      )}     
    </TouchableOpacity>
  );
}
