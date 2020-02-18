import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const RNFS = require("react-native-fs");

import styles from "./UploadScreenStyle";

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage !== null) {
      let imageData = createFormData(selectedImage);
      console.log(imageData);
      axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        url: "https://f6d7fd58.ngrok.io/api/images/upload",
        data: imageData
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }, [selectedImage]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      exif: true
    });

    if (pickerResult.cancelled === true) return;

    ///THIS IS WHERE WE WILL MAKE REQUEST TO API TO GET TAGS
    setSelectedImage({
      localUri: pickerResult.uri,
      exif: pickerResult.exif,
      type: pickerResult.type
      // name: pickerResult.fileName
    });
  };

  const createFormData = (image, exifData) => {
    const data = {
      name: "newImage",
      type: selectedImage.type,
      uri: selectedImage.localUri.replace("file:", "file://")
    };

    return data;
  };

  if (selectedImage !== null) {
    // console.log(selectedImage);
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Button title="cancel" onPress={() => setSelectedImage(null)} />
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
