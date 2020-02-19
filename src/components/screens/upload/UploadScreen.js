import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Text
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";
import axios from "axios";

import Tag from "./bottom/Tag";

import styles from "./UploadScreenStyle";
import {
  keyPrefix,
  bucket,
  region,
  accessKey,
  secretKey,
  successActionStatus,
  API_URL
} from "../../../../configKeys";

import Empty from "./top/Empty";
import CustomButton from "../../global/Button";
import { MaterialIcons } from "@expo/vector-icons";

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [mode, setMode] = useState("EMPTY");
  const [description, setDescription] = useState("");

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

      setMode("LOADING-TAGS");

      RNS3.put(file, options)
        .then(res => {
          if (res.status !== 201) {
            throw new Error("Failed to upload image to S3");
          }
          const url = res.body.postResponse.location;
          console.log("image saved to s3");
          setImageUrl(url);
          return url;
        })
        .then(url => {
          axios
            .get(`${API_URL}images/tags?url=${url}`)
            .then(res => {
              setTags(res.data);
              setMode("LOADED");
            })
            .catch(e => {
              console.log(e);
            });
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

    setSelectedImage({
      localUri: pickerResult.uri,
      exif: pickerResult.exif,
      type: pickerResult.type
    });
    setMode("IMAGE");
  };

  const saveImage = () => {
    console.log("saving");
    setMode("SAVING");

    const imageData = {
      owner_id: 1,
      exif: selectedImage.exif,
      description: description,
      url: imageUrl,
      views: 0,
      tags: tags
    };

    console.log(imageData);
    axios
      .post(`${API_URL}images`, { imageData })
      .then(res => {
        setMode("SAVED");
        console.log(res.data);
      })
      .catch(e => {
        setMode("ERROR");
        console.log(e);
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

  const removeTag = tagName => {
    setTags(tags.filter(tag => tag.name !== tagName));
  };

  const tagsToShow = tags.slice(0, 12).map(tag => {
    return <Tag key={tag.id} tagName={tag.name} delete={removeTag} />;
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.top}>
        {mode === "EMPTY" && <Empty press={pickImage} />}
        {mode !== "EMPTY" && (
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
        )}
      </View>

      <View style={styles.bottom}>
        <View style={styles.imageInfo}>
          {mode === "LOADING-TAGS" && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          {mode === "LOADED" && (
            <>
              <TextInput
                style={styles.description}
                placeholder="Add a description to your photo..."
                onChangeText={text => setDescription(text)}
                value={description}
              ></TextInput>
              <View style={styles.tagsContainer}>{tagsToShow}</View>
              <View style={styles.buttons}>
                <CustomButton
                  onPress={() => {
                    setSelectedImage(null);
                    setTags([]);
                    setImageUrl("");
                    setMode("EMPTY");
                    setDescription("");
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
            </>
          )}
          {mode === "SAVING" && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          {mode === "SAVED" && (
            <>
              <View>
                <MaterialIcons name={"check-box"} size={24} color={"grey"} />
                <Text style={{ fontSize: 18 }}>Sucessfully saved</Text>
              </View>
              <CustomButton
                style={{ width: 300 }}
                onPress={() => {
                  setSelectedImage(null);
                  setTags([]);
                  setImageUrl("");
                  setMode("EMPTY");
                  setDescription("");
                }}
              >
                Add image
              </CustomButton>
            </>
          )}
          {mode === "ERROR" && <Text>Error saving</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}
