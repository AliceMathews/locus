import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Switch
} from "react-native";

import useCurrentLocation from "../../../hooks/useCurrentLocation";
import { getDistance } from "geolib";
import axios from "axios";
import styles from "./PhotosScreenStyle";
import { API_URL } from "../../../../configKeys";
import PhotoTile from "./PhotoTile";

export default function PhotosScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [oneItem, setOneItem] = useState(false);

  const [toggle, setToggle] = useState(false);
  const { currentLocation, _getLocationAsync } = useCurrentLocation();

  const flatListRef = useRef();

  useEffect(() => {
    _getLocationAsync();
    axios.get(`${API_URL}categories/${categoryId}/images`).then(res => {
      setImages(res.data.images);
      setLoading(false);
      if (res.data.images.length === 1) {
        setOneItem(true);
      }
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    axios.get(`${API_URL}categories/${categoryId}/images`).then(res => {
      setImages(res.data.images);
      setRefreshing(false);
      if (res.data.images.length === 1) {
        setOneItem(true);
      } else {
        setOneItem(false);
      }
    });
  };

  const distance = image => {
    console.log(currentLocation);
    const result = getDistance(
      {
        latitude: image.latitude,
        longitude: image.longitude
      },
      currentLocation,
      1
    );

    return result;
  };

  const orderByLocation = () => {
    const imagesToSort = [...images];
    imagesToSort.forEach(image => {
      image.distance = distance(image);
    });
    imagesToSort.sort((a, b) => a.distance - b.distance);
    setImages(imagesToSort);
  };

  const orderByConfidence = () => {
    const imagesToSort = [...images];
    imagesToSort.sort((a, b) => b.confidence - a.confidence);
    console.log(imagesToSort);
    setImages(imagesToSort);
  };

  const deviceWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <TouchableOpacity
          onPress={() => {
            flatListRef.current.scrollToOffset({ index: 0, animated: true });
          }}
        >
          <Text style={styles.categoryTitle}>
            {route.params.categoryName.replace(
              route.params.categoryName[0],
              route.params.categoryName[0].toUpperCase()
            )}
          </Text>
        </TouchableOpacity>
        <View style={styles.toggle}>
          <Switch
            value={toggle}
            onChange={() => {
              setToggle(toggle === false ? true : false);
              toggle === false ? orderByLocation() : orderByConfidence();
            }}
            trackColor={{ true: "#9eb6ba", false: "#dae6e8" }}
            thumbColor={"#6E89A6"}
          />
          <Text style={styles.proximity}>Proximity</Text>
        </View>
      </View>
      <View style={styles.photosContainer}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading && (
          <FlatList
            style={{ left: -2 }}
            numColumns={2}
            data={images}
            renderItem={({ item }) => (
              <PhotoTile
                item={item}
                navigation={navigation}
                deviceWidth={deviceWidth}
                onlyOne={oneItem}
                token={route.params.token}
              />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ref={flatListRef}
          />
        )}
      </View>
    </View>
  );
}
