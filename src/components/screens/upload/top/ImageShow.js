import React from "react";
import { Image } from "react-native";

import FadeInView from "../../../global/FadeInView";
import styles from "./ImageShowStyle";

export default function ImageShow(props) {
  return (
    <FadeInView duration={1000}>
      <Image source={{ uri: props.uri }} style={styles.thumbnail} />
    </FadeInView>
  );
}
