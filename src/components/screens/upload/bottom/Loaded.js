import React, { useState } from "react";
import { View, TextInput } from "react-native";

import TagContainer from "./TagContainer";
import FadeInView from "../../../global/FadeInView";
import CustomButton from "../../../global/Button";

import styles from "./LoadedStyle";

export default function Loaded(props) {
  const [description, setDescription] = useState("");
  return (
    <FadeInView style={{ flex: 1 }} duration={1000}>
      <TextInput
        style={styles.description}
        maxLength={50}
        placeholder="Add a description to your photo..."
        onChangeText={text => setDescription(text)}
        value={description}
      ></TextInput>
      <TagContainer tags={props.tags} delete={props.removeTag} />
      <View style={styles.buttons}>
        <CustomButton
          onPress={() => {
            props.resetState();
          }}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onPress={() => {
            props.saveImage(description);
          }}
        >
          Save
        </CustomButton>
      </View>
    </FadeInView>
  );
}
