import React from "react";
import { View } from "react-native";

import FadeInView from "../../../global/FadeInView";
import Tag from "./Tag";

import styles from "./TagContainerStyle";

export default function TagContainer(props) {
  const tagsToShow = props.tags.map((tag, i) => {
    return (
      <FadeInView key={tag.id} delay={i * 100} duration={200}>
        <Tag key={tag.id} tagName={tag.name} delete={props.delete} />
      </FadeInView>
    );
  });

  return <View style={styles.container}>{tagsToShow}</View>;
}
