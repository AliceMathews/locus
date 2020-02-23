import React, { useState, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
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
import Saved from "./top/Saved";
import Error from "./top/Error";
import CustomButton from "../../global/Button";
import FadeInView from "../../global/FadeInView";
import SavedSuccess from "./bottom/SavedSuccess";
import { MaterialIcons } from "@expo/vector-icons";

import resizeImage from "../../../helpers/upload/resizeImage";
import generateFileName from "../../../helpers/upload/generateFileName";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { reset } from "expo/build/AR";

export default function UploadScreen({ token }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [mode, setMode] = useState("EMPTY");
  const [description, setDescription] = useState("");
  const [currentLocation, setCurrentLocation] = useState({});

  const navigation = useNavigation();

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

  const _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

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
    await _getLocationAsync();
    const options = {
      permissions: ImagePicker.requestCameraPermissionsAsync,
      launch: ImagePicker.launchCameraAsync
    };

    pickImage(options);
  };

  const checkLocation = () => {
    if (!selectedImage.exif.GPSLongitude && !selectedImage.exif.GPSLatitude) {
      const exifCopy = {
        ...selectedImage.exif,
        GPSLongitude: currentLocation.longitude,
        GPSLatitude: currentLocation.latitude
      };
      setSelectedImage({ ...selectedImage, exif: exifCopy });
      console.log("HERE");
      return exifCopy;
    } else {
      return { ...selectedImage.exif };
    }
  };

  const saveImage = () => {
    console.log("saving");
    setMode("SAVING");
    exif = checkLocation();

    const imageData = {
      owner_token: token,
      exif: exif,
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

  const resetState = () => {
    setSelectedImage(null);
    setTags([]);
    setImageUrl("");
    setMode("EMPTY");
    setDescription("");
  };

  const tagsToShow = tags.map((tag, i) => {
    return (
      <FadeInView key={tag.id} delay={i * 100} duration={200}>
        <Tag key={tag.id} tagName={tag.name} delete={removeTag} />
      </FadeInView>
    );
  });

  useFocusEffect(() => {
    if (!token) {
      Alert.alert("Please login", "Please login to upload your photos", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("User");
          }
        }
      ]);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.top}>
          {mode === "EMPTY" && (
            <Empty
              press={openLibrary}
              pressCam={openCamera}
              checkGPS={checkLocation}
            />
          )}
          {mode === "SAVED" && (
            <FadeInView duration={1000}>
              <Saved />
            </FadeInView>
          )}
          {mode === "ERROR" && (
            <FadeInView duration={1000}>
              <Error />
            </FadeInView>
          )}
          {mode !== "EMPTY" && mode !== "SAVED" && mode !== "ERROR" && (
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
                  maxLength={50}
                  placeholder="Add a description to your photo..."
                  onChangeText={text => setDescription(text)}
                  value={description}
                ></TextInput>
                <View style={styles.tagsContainer}>{tagsToShow}</View>
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
            )}
            {mode === "SAVING" && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            {(mode === "SAVED" || mode === "ERROR") && (
              <SavedSuccess reset={resetState} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
