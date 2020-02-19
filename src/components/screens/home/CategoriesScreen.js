import React, { useEffect, useState } from "react";
import { Text, View, Button, Image, ScrollView, FlatList, Dimensions } from "react-native";
import { Tile } from 'react-native-elements';
import axios from 'axios';

import styles from "./CategoriesScreenStyle";

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://a206c4aa.ngrok.io/api/categories')
      .then(res => {
        // console.log(res.data.categories);
        setCategories(res.data.categories);
        console.log(`response from backend ${categories}`);
      });
  }, []);

  const deviceWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={{uri: 'https://locus-dev.s3-us-west-1.amazonaws.com/nsx.jpg'}}
          style={styles.banner}
        />
        <Text>The placeholder for Locus Logo</Text>
      </View>
      <View style={styles.categoriesContainer}>
        <Text>Categories!</Text>
        {/* <Button
          title="Go to photos"
          onPress={(
          ) => navigation.navigate("Photos")}
        /> */}
        <FlatList
          numColumns={2}
          data={categories}
          renderItem={({item}) => 
            <Tile
              style={styles.categoryTile}
              key={item.id}
              imageSrc={{uri: item.cover_photo_url}}
              // imageProps={{resizeMode: 'contain'}}
              title={item.name}
              featured
              onPress={() => navigation.navigate('Photos', {
                categoryId: item.id
              })}
              width={deviceWidth / 2}
              height={deviceWidth / 2}
              titleStyle={styles.categoryTitleStyle}
            />
          }
        />
      </View>
    </View>
  );
}
