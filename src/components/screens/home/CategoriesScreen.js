import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { Tile, SearchBar } from "react-native-elements";
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

  useEffect(() => {
    axios.get(`${API_URL}categories`).then(res => {
      // console.log(res.data.categories);
      setCategories(res.data.categories);
      console.log(`response from backend ${categories}`);
      setFullCategories(res.data.categories);
      setLoading(false);
    });
  }, []);

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
        <Image
          source={{
            uri: "https://locus-dev.s3-us-west-1.amazonaws.com/nsx.jpg"
          }}
          style={styles.banner}
        />
        <SearchBar
          placeholder="Search here..."
          lightTheme
          round
          onChangeText={text => searchFilterCategories(text)}
          value={searchValue}
          showCancel={true}
        />
        <Text>The placeholder for Locus Logo</Text>
      </View>
      <View style={styles.categoriesContainer}>
        <FlatList
          numColumns={2}
          data={categories}
          renderItem={({ item }) => (
            <Tile
              style={styles.categoryTile}
              key={item.id}
              imageSrc={{ uri: item.cover_photo_url }}
              title={item.name}
              featured
              onPress={() =>
                navigation.navigate("Photos", {
                  categoryId: item.id
                })
              }
              width={deviceWidth / 2}
              height={deviceWidth / 2}
              titleStyle={styles.categoryTitleStyle}
            />
          )}
        />
      </View>
    </View>
  );
}
