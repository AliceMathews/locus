import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EmptyTop(props) {
  return (
    <View>
      <MaterialIcons
        name={"add-circle"}
        size={32}
        color={"blue"}
        onPress={() => props.press()}
      />
    </View>
  );
}
