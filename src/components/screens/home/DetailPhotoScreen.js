import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Platform
} from "react-native";
import FadeInView from "../../global/FadeInView";
import CustomButton from "../../global/Button";
import WebView from "react-native-webview";
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
    console.log(result.toString());

    if (result.toString().length <= 3) {
      return result + " m";
    } else {
      return (result / 1000).toFixed(0) + " km";
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

  const displayCallout = () => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      setTimeout(() => {
        markerRef.current.showCallout();
      }, 500);
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
        onMapReady={displayCallout}
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
          {Platform.OS === "ios" && (
            <>
              <Image source={icon} style={styles.icon} />
              <Callout onPress={() => setShowPhoto(true)} tooltip={true}>
                <Image
                  source={{ uri: route.params.image.url }}
                  style={styles.thumbnail_ios}
                />
              </Callout>
            </>
          )}
          {Platform.OS === "android" && (
            <View>
              <FadeInView duration={500}>
                <Image source={icon} style={styles.icon} />
              </FadeInView>
              <Callout onPress={() => setShowPhoto(true)} tooltip={true}>
                <WebView
                  source={{ uri: route.params.image.url }}
                  style={styles.thumbnail_android}
                  resizeMode={"cover"}
                />
              </Callout>
            </View>
          )}
        </Marker>
      </MapView>

      <View style={styles.botContainer}>
        <View style={styles.botHeader}>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Chat", {
                  sendToId: route.params.image.owner_id
                })
              }
            >
              <Text style={styles.username}>
                Credit:{" "}
                <Text style={styles.bold}>{route.params.image.username} </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.direction}>
            <CustomButton onPress={() => getDirections()}>
              Directions
            </CustomButton>
            <Text style={{ color: "#a6a6a6" }}>{distance()}</Text>
          </View>
        </View>

        {route.params.image.description === "" || (
          <View style={styles.titleSection}>
            <View>
              <Text style={styles.title}>{route.params.image.description}</Text>
            </View>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Camera Make |
            <Text style={styles.bold}> {route.params.image.camera_make}</Text>
          </Text>

          <View style={styles.cameraSettings}>
            <View>
              <Text style={styles.info}>
                Aperture |
                <Text style={styles.bold}>
                  {" "}
                  F{route.params.image.aperture.toFixed(2)}
                </Text>
              </Text>
              <Text style={styles.info}>
                Exposure |
                <Text style={styles.bold}>
                  {" "}
                  + {route.params.image.exposure.toFixed(3)}
                </Text>
              </Text>
              <Text style={styles.info}>
                ISO | <Text style={styles.bold}>{route.params.image.iso}</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.info}>
                Shutter speed |
                <Text style={styles.bold}>
                  {" "}
                  {route.params.image.shutter_speed.toFixed(2)} S
                </Text>
              </Text>
              <Text style={styles.info}>
                Focal length |
                <Text style={styles.bold}>
                  {" "}
                  {route.params.image.focul_length} Mm
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
