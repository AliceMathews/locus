import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
// import { Tile, SearchBar } from "react-native-elements";
// import { CacheManager } from 'react-native-expo-image-cache';
import LiveSearch from './LiveSearch';
import Tile from './Tile';
import CategoryTile from './CategoryTile';

import axios from "axios";

import { API_URL } from "../../../../configKeys";

import styles from "./CategoriesScreenStyle";

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fullCategories, setFullCategories] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");

  const [uri, setUri] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get(`${API_URL}categories`).then(res => {
      setCategories(res.data.categories);
      console.log(`response from backend ${categories}`);
      setFullCategories(res.data.categories);
      setLoading(false);
    });
  }

  const deviceWidth = Dimensions.get("window").width;

  const searchFilterCategories = text => {
    setSearchValue(text);
    const searchResults = fullCategories.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setCategories(searchResults);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <LiveSearch
          value={searchValue}
          onChangeText={text => searchFilterCategories(text)}
          width={deviceWidth * 0.85}
        />
      </View>
      <View style={styles.categoriesContainer}>
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}

        {/* {!loading && (
          <FlatList
            numColumns={2}
            data={categories}
            keyExtractor={item => item.id}
            renderItem={renderTile}
          />
        )} */}
        
        {!loading && (
          <FlatList
            numColumns={2}
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <CategoryTile
                  item={item}
                  navigation={navigation}
                  deviceWidth={deviceWidth}
                />
              );
            }}
          />)}
      </View>
    </View>
  );
}
