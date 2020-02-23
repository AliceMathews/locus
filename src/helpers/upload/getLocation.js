import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const _getLocationAsync = async () => {
  try {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});

    console.log(location);
    return location;
    // setCurrentLocation({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude
    // });
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export default _getLocationAsync;
