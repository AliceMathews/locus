import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ImageBackground, TextInput, FlatList } from "react-native";

import io from 'socket.io-client';


import styles from './ChatStyle';
import { API_URL } from '../../../../configKeys';

export default function Chat({ navgiation, route }) {
  const { sendToId } = route.params;
  console.log(sendToId);

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);


  useEffect(() => {
  });

  // const messages = chatMessages.map((msg) => (
  //   <Text>{msg}</Text>
  // ));
  console.log(chatMessages);

  const onSubmitEditing = () => {
    setChatMessages([...chatMessages, message]);
    setMessage("");

  }

  return (
    <View style={styles.container}>
        <View style={styles.messagesContainer}>
          {/* <FlatList
            data={chatMessages}
            key={1}
            renderItem={({ item }) => {
              (<Text>hi</Text>)
            }}
          /> */}
          {chatMessages.map(chat => {
            return (<Text>{chat}</Text>);
          })}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{height: 40, borderWidth: 2, width: 250, position: 'absolute'}}
            autoCorrect={false}
            value={message}
            onSubmitEditing={onSubmitEditing}
            onChangeText={msg => setMessage(msg)}
          />
        </View>
    </View>
  );
}
