import React, { useState } from "react";
import { Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import styles from "./UploadScreenStyle";

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) return;

    ///THIS IS WHERE WE WILL MAKE REQUEST TO API TO GET TAGS
    console.log(pickerResult);
    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Upload!</Text>
      <Button title="add image" onPress={pickImage} />
    </View>
  );
}
