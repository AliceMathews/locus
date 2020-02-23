import { useState } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState({});

  const _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log("RUNNING LOCATION FNC");
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  // _getLocationAsync();

  return { currentLocation, _getLocationAsync };
}
