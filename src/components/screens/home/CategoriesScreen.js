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
  ImageBackground
} from "react-native";
import { Tile, SearchBar } from "react-native-elements";
import { CacheManager } from 'react-native-expo-image-cache';
import LiveSearch from './LiveSearch';

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
    // navigation.addListener("focus", () => {
    //   console.log("focused");
    //   fetchCategories();
    // })
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get(`${API_URL}categories`).then(res => {

      // for (let i = 0; i < res.data.categories.length; i++) {
      //   res.data.categories[i].cover_photo_url = CacheManager.get(res.data.categories[i].cover_photo_url).getPath();
      // }

      // const pArr = res.data.categories.map((category, idx) => {
      //   return CacheManager.get(category.cover_photo_url).getPath().then((url) => {
      //     return {idx, url};
      //   });
      // });

      // Promise.all(pArr).then(vArr => {
      //   console.log(`vArr ${vArr}`);
      //   vArr.forEach((cover) => {
      //     const {idx, url} = cover || {};
      //     res.data.categories[idx].cover_photo_url = url;
      //   });
      // }).then(() => {
        setCategories(res.data.categories);
        console.log(`response from backend ${categories}`);
        setFullCategories(res.data.categories);
        setLoading(false);
      // })

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

  const renderTile = ({ item }) => {
    return (
        <Tile
          style={styles.categoryTile}
          key={item.id}
          // imageSrc={{ uri: item.cover_photo_url}}
          title={item.name}
          titleStyle={{color:'red'}}
          featured
          onPress={() =>
            navigation.navigate("Photos", {
              categoryId: item.id
            })
          }
          width={deviceWidth / 2}
          height={deviceWidth / 2}
          titleStyle={styles.categoryTitleStyle}
          // imageProps={{style}}
          ImageComponent={() => {
            return (
              <View>
                {/* <Image
                  source={{uri: item.cover_photo_url, cache: "force-cache"}}
                  style={{width: deviceWidth / 2, height: deviceWidth / 2}}
                />
                <Text
                  style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}
                >{item.name}</Text> */}
                <ImageBackground 
                  source={{uri: item.cover_photo_url, cache: "force-cache"}}
                  style={{width: deviceWidth / 2, height: deviceWidth / 2}}
                >
                <Text>{item.name}</Text>
                </ImageBackground>
              </View> 
            )
          }}
        />
    );
  }


  // const testUri = "https://locus-dev.s3.amazonaws.com/development%2Ff3OwtL.jpg";
  // // CacheManager.cache(testUri, localURI => setValue(localURI));
  // CacheManager.get(testUri).getPath().then(res => {
  //   console.log(`cached URI: ${res}`);
  // })
  
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
        {!loading && (
          <FlatList
            numColumns={2}
            data={categories}
            keyExtractor={item => item.id}
            renderItem={renderTile}
          />
        )}
        {/* {categories.map((category) => {
          return (
            <Image
              key={category.id}
              source={{uri: category.cover_photo_url,
                      cache: "only-if-cached"}}
              style={{width:100, height: 100}}
            />
            // <Text>{category.cover_photo_url}</Text>
          )
        })} */}
        {/* <FlatList
            numColumns={2}
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              console.log(`url: ${item.cover_photo_url}`);
              return (
                <Image
                  key={item.id}
                  source={{uri: item.cover_photo_url,
                          cache: "force-cache"}}
                  style={{width:200, height: 200}}
                />
              );
            }}
          /> */}

      </View>
    </View>
  );
}
