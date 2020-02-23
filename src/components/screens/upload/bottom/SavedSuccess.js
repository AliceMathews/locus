import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FadeInView from "../../../global/FadeInView";
import CustomButton from "../../../global/Button";

import styles from "./SavedSuccessStyle";

export default function SavedSuccess(props) {
  const navigation = useNavigation();
  const reqEntries = [
    "longitude",
    "latitude",
    "aperture",
    "shutter_speed",
    "iso",
    "exposure",
    "focul_length"
  ];

  const reqInfo = Object.entries(props.info).filter(el => {
    if (reqEntries.includes(el[0])) {
      return el;
    }
  });

  const photoInfo = reqInfo.map((setting, i) => {
    return (
      <Text key={i} style={styles.text}>
        {setting[0]} | <Text style={styles.bold}>{setting[1]}</Text>
      </Text>
    );
  });

  return (
    <FadeInView duration={1000} delay={1000}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Photo data:</Text>
          {photoInfo}
        </View>
        <View style={styles.buttons}>
          <CustomButton
            type={"big"}
            onPress={() => {
              props.reset();
            }}
          >
            Add another
          </CustomButton>
          <CustomButton
            type={"big"}
            onPress={() => {
              props.reset();
              navigation.navigate("User");
            }}
          >
            My photos
          </CustomButton>
        </View>
      </View>
    </FadeInView>
  );
}
