import * as ImageManipulator from "expo-image-manipulator";

const resizeImage = pickerResult => {
  if (pickerResult.exif.Orientation == 6) {
    if (pickerResult.width > pickerResult.height) {
      const x = pickerResult.width;
      const y = pickerResult.height;
      pickerResult.width = y;
      pickerResult.height = x;
      console.log("when i leave", pickerResult);
    }
  }

  const downsizeRatio = pickerResult.width / 1080;
  const resizedDimension = {
    width: 1080,
    height: pickerResult.height / downsizeRatio
  };

  const manipResult = ImageManipulator.manipulateAsync(
    pickerResult.uri,
    [{ resize: resizedDimension }],
    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipResult;
};

export default resizeImage;
