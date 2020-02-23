import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

// import resizeImage from "../../../helpers/upload/resizeImage";
import resizeImage from "../helpers/upload/resizeImage";

export default function useSelectImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLibrary = () => {
    const options = {
      permissions: ImagePicker.requestCameraRollPermissionsAsync,
      launch: ImagePicker.launchImageLibraryAsync
    };

    pickImage(options);
  };

  const openCamera = () => {
    // await _getLocationAsync();
    const options = {
      permissions: ImagePicker.requestCameraPermissionsAsync,
      launch: ImagePicker.launchCameraAsync
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
      // setMode("IMAGE");
    } catch (err) {
      console.log(err);
    }
  };

  return { selectedImage, setSelectedImage, openLibrary, openCamera };
}
