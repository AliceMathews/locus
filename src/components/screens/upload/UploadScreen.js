import React, { useState, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { RNS3 } from "react-native-aws3";
import axios from "axios";

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

import useSelectImage from "../../../hooks/useSelectImage";
import useCurentLocation from "../../../hooks/useCurrentLocation";
import checkLocation from "../../../helpers/upload/exifGPSCheck";
import generateFileName from "../../../helpers/upload/generateFileName";

import CustomButton from "../../global/Button";
import FadeInView from "../../global/FadeInView";
import Spinner from "../../global/Spinner";
import Empty from "./top/Empty";
import Saved from "./top/Saved";
import Error from "./top/Error";
import ImageShow from "./top/ImageShow";
import SavedSuccess from "./bottom/SavedSuccess";
import TagContainer from "./bottom/TagContainer";

export default function UploadScreen({ token }) {
  const navigation = useNavigation();
  const [tags, setTags] = useState([]);
  const [mode, setMode] = useState("EMPTY");
  const [imageInfo, setImageInfo] = useState({});
  const { currentLocation, _getLocationAsync } = useCurentLocation();
  const {
    selectedImage,
    setSelectedImage,
    openCamera,
    openLibrary
  } = useSelectImage();

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
      _getLocationAsync();

      RNS3.put(file, options)
        .then(res => {
          if (res.status !== 201) {
            throw new Error("Failed to upload image to S3");
          }
          const url = res.body.postResponse.location;
          setImageInfo({ ...imageInfo, url });
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
              throw new Error("Error: ", e);
            });
        });
    }
  }, [selectedImage]);

  const saveImage = async () => {
    setMode("SAVING");
    let exif = checkLocation(selectedImage.exif, currentLocation);

    const imageData = {
      owner_token: token,
      exif: exif,
      description: imageInfo.description,
      url: imageInfo.url,
      views: 0,
      tags: tags
    };

    axios
      .post(`${API_URL}images`, { imageData })
      .then(res => {
        setImageInfo(res.data);
        setMode("SAVED");
      })
      .catch(e => {
        setMode("ERROR");
        console.log("ERROR", e);
      });
  };

  const removeTag = tagName => {
    setTags(tags.filter(tag => tag.name !== tagName));
  };

  const resetState = () => {
    setSelectedImage(null);
    setTags([]);
    setMode("EMPTY");
    setImageInfo("");
  };

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
            <Empty press={openLibrary} pressCam={openCamera} />
          )}
          {mode === "SAVED" && <Saved />}
          {mode === "ERROR" && <Error />}
          {mode !== "EMPTY" && mode !== "SAVED" && mode !== "ERROR" && (
            <ImageShow uri={selectedImage.localUri} />
          )}
        </View>

        <View style={styles.bottom}>
          <View style={styles.imageInfo}>
            {mode === "LOADING-TAGS" && <Spinner />}
            {mode === "LOADED" && (
              <FadeInView style={{ flex: 1 }} duration={1000}>
                <TextInput
                  style={styles.description}
                  maxLength={50}
                  placeholder="Add a description to your photo..."
                  onChangeText={text =>
                    setImageInfo({ ...imageInfo, description: text })
                  }
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
            )}
            {mode === "SAVING" && <Spinner />}
            {(mode === "SAVED" || mode === "ERROR") && (
              <SavedSuccess info={imageInfo} reset={resetState} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
