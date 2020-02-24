import React from "react";
import { Image } from "react-native";

import FadeInView from "../../../global/FadeInView";
import styles from "./ImageShowStyle";

export default function ImageShow(props) {
  return (
    <FadeInView duration={1000} style={{ position: "relative" }}>
      <Image source={{ uri: props.uri }} style={styles.thumbnail} />
    </FadeInView>
  );
}
