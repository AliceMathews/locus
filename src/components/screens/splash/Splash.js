import React from "react";
import { View, Image } from "react-native";
import splash from "../../../../assets/splash.png";
import styles from "./SplashScreenStyle";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={splash} resizeMode="cover"></Image>
    </View>
  );
}
