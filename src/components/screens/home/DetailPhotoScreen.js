import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import FadeInView from "../../global/FadeInView";
import CustomButton from "../../global/Button";
import WebView from "react-native-webview";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { styles, retro, Aubergine } from "./DetailPhotoScreenStyle";
import icon from "../../../../assets/locus.png";
import { Linking } from "expo";
import { getDistance } from "geolib";
import { MaterialIcons } from "@expo/vector-icons";

import axios from "axios";
import { API_URL } from "../../../../configKeys";

import useScreenBrightness from "../../../hooks/useScreenBrightness";
import useCurrentLocation from "../../../hooks/useCurrentLocation";

export default function DetailPhotoScreen({ route, navigation }) {
  const [showPhoto, setShowPhoto] = useState(false);
  const [user, setUser] = useState(null);
  const { currentBrightness } = useScreenBrightness();
  const { currentLocation, _getLocationAsync } = useCurrentLocation();

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
      return result + " m";
    } else {
      return (result / 1000).toFixed(0) + " km";
    }
  };

  const _getUserInfoAsync = async () => {
    try {
      const currentUser = await axios.get(`${API_URL}users/myinfo`, {
        headers: { authorization: route.params.token }
      });
      console.log(`user: `);
      console.log(currentUser);
      //Only if this user id is set then we display a button to go to chat!!
      if (currentUser.data) {
        setUser(currentUser.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _getLocationAsync();
    _getUserInfoAsync();
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
        <ScrollView
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.74)"
          }}
          maximumZoomScale={1.00001}
          bouncesZoom={true}
        >
          <TouchableOpacity onPress={() => setShowPhoto(false)}>
            <Image
              source={{ uri: route.params.image.url }}
              style={styles.expanded}
            />
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <MapView
        onMapReady={displayCallout}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={currentBrightness >= 0.5 ? retro : Aubergine}
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
          <View style={styles.userInfoAndChatContainer}>
            <Text style={styles.username}>
              Credit:{" "}
              <Text style={styles.bold}>{route.params.image.username} </Text>
            </Text>
            {user && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Chat", {
                    imageId: route.params.image.id,
                    user: user
                  });
                }}
                style={{ marginLeft: 5 }}
              >
                <MaterialIcons name={"chat"} size={28} color={"#7A96B2"} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.direction}>
            <CustomButton onPress={() => getDirections()}>
              Directions
            </CustomButton>
            <Text style={{ color: "#a6a6a6" }}>{distance()}</Text>
          </View>
        </View>

        {route.params.image.description === "" ||
          !route.params.image.description || (
            <View style={styles.titleSection}>
              <View>
                <Text style={styles.title}>
                  {route.params.image.description}
                </Text>
              </View>
            </View>
          )}

        <View style={styles.infoContainer}>
          {route.params.image.camera_make && (
            <Text style={styles.info}>
              Camera Make |
              <Text
                style={styles.bold}
              >{` ${route.params.image.camera_make}`}</Text>
            </Text>
          )}

          <View style={styles.cameraSettings}>
            <View>
              {route.params.image.exposure && (
                <Text style={styles.info}>
                  Exposure |
                  <Text style={styles.bold}>
                    {route.params.image.exposure >= 0 ? ` +${route.params.image.exposure}` : ` ${route.params.image.exposure}` }
                  </Text>
                </Text>
              )}

              {route.params.image.focul_length && (
                <Text style={styles.info}>
                  Focal length |
                  <Text style={styles.bold}>
                    {` ${route.params.image.focul_length} mm`}
                  </Text>
                </Text>
              )}
              {route.params.image.shutter_speed && (
                <Text style={styles.info}>
                  Shutter speed |
                  <Text style={styles.bold}>
                    {` ${route.params.image.shutter_speed} ms`}
                  </Text>
                </Text>
              )}
            </View>
            <View>
              {route.params.image.iso && (
                <Text style={styles.info}>
                  ISO |
                  <Text
                    style={styles.bold}
                  >{` ${route.params.image.iso}`}</Text>
                </Text>
              )}

              {route.params.image.aperture && (
                <Text style={styles.info}>
                  Aperture |
                  <Text style={styles.bold}>
                    {` F${route.params.image.aperture}`}
                  </Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
