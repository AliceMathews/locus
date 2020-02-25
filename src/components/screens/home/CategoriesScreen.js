import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import LiveSearch from "./LiveSearch";
import CategoryTile from "./CategoryTile";

import axios from "axios";

import { API_URL } from "../../../../configKeys";

import styles from "./CategoriesScreenStyle";
import { useNavigation } from "@react-navigation/native";

export default function CategoriesScreen({ token }) {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fullCategories, setFullCategories] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const [searching, setSearching] = useState(false);

  const [oneItem, setOneItem] = useState(false);

  const flatListRef = useRef();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get(`${API_URL}categories`).then(res => {
      setCategories(res.data.categories);
      console.log(`response from backend ${categories}`);
      setFullCategories(res.data.categories);
      setLoading(false);
      if (res.data.categories === 1) {
        setOneItem(true);
      } else {
        setOneItem(false);
      }
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    axios.get(`${API_URL}categories`).then(res => {
      setCategories(res.data.categories);
      setFullCategories(res.data.categories);
      setRefreshing(false);
      if (res.data.categories === 1) {
        setOneItem(true);
      } else {
        setOneItem(false);
      }
    });
  };

  const deviceWidth = Dimensions.get("window").width;

  const searchFilterCategories = text => {
    setSearchValue(text);
    setSearching(true);
    const searchResults = fullCategories.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    if (searchResults.length === 1) {
      setOneItem(true);
    } else {
      setOneItem(false);
    }
    setCategories(searchResults);
    setSearching(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <TouchableOpacity
          onPress={() =>
            flatListRef.current.scrollToOffset({ index: 0, animated: true })
          }
        >
          <LiveSearch
            value={searchValue}
            onChangeText={text => searchFilterCategories(text)}
            width={deviceWidth * 0.95}
            loading={searching}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesContainer}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {!loading && (
          <FlatList
            numColumns={2}
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <CategoryTile
                  item={item}
                  navigation={navigation}
                  deviceWidth={deviceWidth}
                  oneItem={oneItem}
                  token={token}
                />
              );
            }}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ref={flatListRef}
          />
        )}
      </View>
    </View>
  );
}
