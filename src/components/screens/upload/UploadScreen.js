import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard
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
import FadeInView from "../../global/FadeInView";
import { MaterialIcons } from "@expo/vector-icons";

import resizeImage from "../../../helpers/upload/resizeImage";
import generateFileName from "../../../helpers/upload/generateFileName";

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

  const openLibrary = () => {
    const options = {
      permissions: ImagePicker.requestCameraRollPermissionsAsync,
      launch: ImagePicker.launchImageLibraryAsync
    };

    pickImage(options);
  };

  const pickImage = async options => {
    const permissionResult = await options.permissions();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    try {
      let pickerResult = await options.launch({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        exif: true
      });

      const manipResult = await resizeImage(pickerResult);
      if (pickerResult.cancelled === true) return;

      setSelectedImage({
        localUri: manipResult.uri,
        exif: pickerResult.exif,
        type: pickerResult.type
      });
      setMode("IMAGE");
    } catch (err) {
      console.log(err);
    }
  };

  const openCamera = async () => {
    const options = {
      permissions: ImagePicker.requestCameraPermissionsAsync,
      launch: ImagePicker.launchCameraAsync
    };

    pickImage(options);
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

  const removeTag = tagName => {
    setTags(tags.filter(tag => tag.name !== tagName));
  };

  const tagsToShow = tags.map((tag, i) => {
    return (
      <FadeInView key={tag.id} delay={i * 100} duration={200}>
        <Tag key={tag.id} tagName={tag.name} delete={removeTag} />
      </FadeInView>
    );
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.top}>
          {mode === "EMPTY" && (
            <Empty press={openLibrary} pressCam={openCamera} />
          )}
          {mode !== "EMPTY" && (
            <FadeInView duration={1000}>
              <Image
                source={{ uri: selectedImage.localUri }}
                style={styles.thumbnail}
              />
            </FadeInView>
          )}
        </View>

        <View style={styles.bottom}>
          <View style={styles.imageInfo}>
            {mode === "LOADING-TAGS" && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            {mode === "LOADED" && (
              <FadeInView style={{ flex: 1 }} duration={1000}>
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
              </FadeInView>
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
    </TouchableWithoutFeedback>
  );
}
