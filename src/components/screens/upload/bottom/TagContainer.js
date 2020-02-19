import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import Tag from "./Tag";

export default function TagContainer(props) {
  const tagsToShow = props.tags.slice(0, 9).map(tag => {
    console.log(tag);
    return <Tag key={tag.id} tagName={tag.name} delete={props.removeTag} />;
  });

  return (
    <View>
      <Tag>{tagsToShow}</Tag>
    </View>
  );
}
