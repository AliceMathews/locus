import React from "react";
import { View } from "react-native";

import FadeInView from "../../../global/FadeInView";
import CustomButton from "../../../global/Button";

import styles from "./LoadedStyle";

export default function Loaded(props) {
  return (
    <FadeInView style={{ flex: 1 }} duration={1000}>
      <TextInput
        style={styles.description}
        maxLength={50}
        placeholder="Add a description to your photo..."
        onChangeText={text => setImageInfo({ ...imageInfo, description: text })}
        value={imageInfo.description}
      ></TextInput>
      <TagContainer tags={tags} delete={removeTag} />
      <View style={styles.buttons}>
        <CustomButton
          onPress={() => {
            resetState();
          }}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onPress={() => {
            saveImage();
          }}
        >
          Save
        </CustomButton>
      </View>
    </FadeInView>
  );
}
