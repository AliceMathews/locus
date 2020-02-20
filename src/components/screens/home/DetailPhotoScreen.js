import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import CustomButton from "../../global/Button";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { styles, retro, Aubergine } from "./DetailPhotoScreenStyle";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import icon from "../../../../assets/locus.png";
import { Linking } from "expo";
import { getDistance } from "geolib";

export default function DetailPhotoScreen({ route, navigation }) {
  const [currentLocation, setCurrentLocation] = useState({});
  const [showPhoto, setShowPhoto] = useState(false);

  const distance = () => {
    const result = getDistance(
      {
        latitude: route.params.image.latitude,
        longitude: route.params.image.longitude
      },
      currentLocation,
      1
    );
    if (result.toString().length <= 3) {
      return result + "m";
    } else {
      return result / 1000 + "km";
    }
  };

  const _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    _getLocationAsync();
  }, []);

  const getDirections = () => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${route.params.image.latitude},${route.params.image.longitude}`
    );
  };

  const markerRef = useRef(null);

  const onRegionChangeComplete = () => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      markerRef.current.showCallout();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={showPhoto} transparent={true}>
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.74)" }}>
          <TouchableOpacity onPress={() => setShowPhoto(false)}>
            <Image
              source={{ uri: route.params.image.url }}
              style={styles.expanded}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <MapView
        onMapReady={onRegionChangeComplete}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={retro}
        showsUserLocation={true}
        initialRegion={{
          latitude: route.params.image.latitude,
          longitude: route.params.image.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          ref={markerRef}
          coordinate={{
            latitude: route.params.image.latitude,
            longitude: route.params.image.longitude
          }}
        >
          <Image source={icon} style={styles.icon} />
          <Callout onPress={() => setShowPhoto(true)} tooltip={true}>
            <Image
              source={{ uri: route.params.image.url }}
              style={styles.thumbnail}
            />
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.botContainer}>
        <View style={styles.botHeader}>
          <Text>Credit: {route.params.image.owner_id}</Text>
          <View style={styles.direction}>
            <CustomButton onPress={() => getDirections()}>
              Directions
            </CustomButton>
            <Text>{distance()}</Text>
          </View>
        </View>

        <View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{route.params.image.description}</Text>
          </View>

          <Text style={styles.info}>
            Camera Make |
            <Text style={styles.bold}> {route.params.image.camera_make}</Text>
          </Text>
          <Text style={styles.info}>
            Aperture |
            <Text style={styles.bold}> F{route.params.image.aperture}</Text>
          </Text>
          <Text style={styles.info}>
            Exposure |
            <Text style={styles.bold}> + {route.params.image.exposure}</Text>
          </Text>
          <Text style={styles.info}>
            ISO | <Text style={styles.bold}>{route.params.image.iso}</Text>
          </Text>
          <Text style={styles.info}>
            Shutter speed |
            <Text style={styles.bold}>
              {" "}
              {route.params.image.shutter_speed} S
            </Text>
          </Text>
          <Text style={styles.info}>
            Focal length |
            <Text style={styles.bold}>
              {" "}
              {route.params.image.focal_length} Mm
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
