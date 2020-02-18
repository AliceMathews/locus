import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";
import axios from "axios";

import styles from "./UploadScreenStyle";
import {
  keyPrefix,
  bucket,
  region,
  accessKey,
  secretKey,
  successActionStatus
} from "../../../../configKeys";

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage !== null) {
      const file = {
        uri: selectedImage.localUri,
        name: generateFileName(),
        type: "image/jpg"
      };

      const options = {
        keyPrefix,
        bucket,
        region,
        accessKey,
        secretKey,
        successActionStatus
      };

      RNS3.put(file, options).then(res => {
        if (res.status !== 201) {
          throw new Error("Failed to upload image to S3");
        }
        console.log(res.body.postResponse.location);
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

  const generateFileName = () => {
    let count = 0;
    let randomString = "";

    while (count < 6) {
      let randomNumber = Math.floor(Math.random() * (122 - 48 + 1) + 48);
      let randomChar = "";

      if (randomNumber >= 58 && randomNumber <= 64) {
        continue;
      } else if (randomNumber >= 91 && randomNumber <= 96) {
        continue;
      } else {
        //convert to character
        randomChar = String.fromCharCode(randomNumber);
        randomString += randomChar;
        count++;
      }
    }

    return `${randomString}.jpg`;
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
