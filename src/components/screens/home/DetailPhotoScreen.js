import React from "react";
import { Text, View, Button, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import axios from "axios";
import styles from "./DetailPhotoScreenStyle";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import icon from "../../../../assets/locus.png";
import { Linking } from "expo";

export default function DetailPhotoScreen({ route, navigation }) {
  console.log(route.params.image.latitude, route.params.image.longitude);
  // const getDirections = async (lat, lng) => {
  //   try {
  //     const res = await axios.get(
  //       `https://maps.googleapis.com/maps/api/directions/json?origin=${lat},${lng}&destination=49.289819,-123.132738&key=AIzaSyCdi-QygTTR2juKfO73ICLvP5njdTHj-bI`
  //     );
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log("Something went wrong", err);
  //   }
  // };

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
  };

  // const lat = 49.289819;
  // const lng = -123.132738;

  // const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  // const latLng = `${lat},${lng}`;
  // const label = "Custom Label";
  // const url = Platform.select({
  //   ios: `${scheme}${label}@${latLng}`,
  //   android: `${scheme}${latLng}(${label})`
  // });

  const url =
    "https://66.media.tumblr.com/45c127dfae4a1438fe0d8c33f385e5b3/tumblr_oxsan65onQ1vswa89o1_1280.jpg";

  const getDirections = () => {
    Linking.openURL(
      "https://www.google.com/maps/dir/?api=1&destination=City+Hall%2C+New+York%2C+NY"
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: route.params.image.latitude,
          longitude: route.params.image.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.image.latitude,
            longitude: route.params.image.longitude
          }}
        >
          <Image
            source={icon}
            style={{
              height: 45,
              width: 45,
              borderRadius: 50
            }}
          />
          <Callout>
            <Image source={{ uri: url }} style={{ height: 100, width: 100 }} />
          </Callout>
        </Marker>
      </MapView>
      <Text>Detailed Photo with map!</Text>
      <Button
        title="View fullscreen photo"
        onPress={() => navigation.navigate("Photo-full")}
      />

      <Button title="google maps" onPress={() => getDirections()} />
      <Button title="locate me" onPress={() => _getLocationAsync()} />
    </View>
  );
}
