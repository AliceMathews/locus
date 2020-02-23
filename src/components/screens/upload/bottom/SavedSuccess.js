import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import FadeInView from "../../../global/FadeInView";
import CustomButton from "../../../global/Button";

import styles from "./SavedSuccessStyle";

export default function SavedSuccess(props) {
  const navigation = useNavigation();
  return (
    <FadeInView duration={1000} delay={1000}>
      <View style={styles.buttons}>
        <CustomButton
          type={"big"}
          onPress={() => {
            props.reset;
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
    </FadeInView>
  );
}
