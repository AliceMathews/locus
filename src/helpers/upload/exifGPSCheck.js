const checkLocation = (imageExif, currentLocation) => {
  if (!imageExif.GPSLongitude && !imageExif.GPSLatitude) {
    const exifCopy = {
      ...imageExif,
      GPSLongitude: currentLocation.longitude,
      GPSLatitude: currentLocation.latitude
    };
    return exifCopy;
  } else {
    return { ...imageExif };
  }
};

export default checkLocation;
