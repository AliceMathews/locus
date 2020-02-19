import React from "react";
import { Text, View, Image } from "react-native";
import { SearchBar } from "react-native-elements";

import styles from "./LiveSearchStyle";

export default function LiveSearch(props) {
  return (
      <SearchBar
          placeholder="Search here..."
          lightTheme
          round
          onChangeText={props.onChangeText}
          value={props.value}
          showCancel={true}
          containerStyle={{width: props.width}}
      />
  );
}
