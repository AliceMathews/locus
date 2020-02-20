import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Button,
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import styles from "./DetailPhotoScreenStyle";
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
      <Modal visible={showPhoto} transparent={true} animationType={"fade"}>
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}>
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
        customMapStyle={mapStyle}
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
          <Callout onPress={() => setShowPhoto(true)}>
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
            <Button title="Directions" onPress={() => getDirections()} />
            <Text>{distance()}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.info}>
            description: {route.params.image.description}
          </Text>
          <Text style={styles.info}>
            camera make: {route.params.image.camera_make}
          </Text>
          <Text style={styles.info}>
            aperture: {route.params.image.aperture}
          </Text>
          <Text style={styles.info}>
            exposure: {route.params.image.exposure}
          </Text>
          <Text style={styles.info}>iso: {route.params.image.iso}</Text>
          <Text style={styles.info}>
            shutter speed: {route.params.image.shutter_speed}
          </Text>
          <Text style={styles.info}>
            focal_length: {route.params.image.focal_length}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b9d3c2"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d"
      }
    ]
  }
];
