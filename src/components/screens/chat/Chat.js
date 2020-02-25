import React, { Component } from "react";
import { Dimensions, YellowBox } from "react-native";

import io from "socket.io-client";

import { ROOT_URL } from "../../../../configKeys";
import styles from "./ChatStyle";

import { GiftedChat } from "react-native-gifted-chat";

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socketId: ""
    };
    this.deviceWidth = Dimensions.get("window").width;
    this.imageId = props.route.params.imageId;
    this.userId = props.route.params.user.id;
    this.username = props.route.params.user.username;
    this.avatar = props.route.params.user.profile_pic;
    console.log(`image: ${this.imageId}`);
    console.log("userId");
    console.log(this.userId);
    this.navigation = props.navigation;
  }

  componentDidMount() {
    this.socket = io(ROOT_URL);
    // this.socket.emit('room', this.imageId);
    this.socket.on("connect", () => {
      this.socket.emit("room", { roomId: this.imageId, name: this.username });
      console.log(`conencted as ${this.socket.id}`);
      this.setState({ socketId: this.socket.id });
    });
    this.socket.on("chat message", msg => {
      console.log(`got a message from ${msg.id}`);
      if (this.socketId === msg.id) {
        console.log("I got a message from myself");
      }
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg)
      }));
    });

    this.socket.on("new person", msg => {
      console.log("new person joined the room " + msg);
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [
          {
            _id: this.generateId(),
            text: `${msg} has joined the room`,
            createdAt: new Date(),
            user: {
              _id: "woenfowienfowienfow",
              name: "Room Admin",
              avatar:
                "https://image.shutterstock.com/image-vector/bot-icon-chatbot-concept-cute-260nw-715418284.jpg"
            }
          }
        ])
      }));
    });

    this.socket.on("someone left", msg => {
      console.log("someone left the room");
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [
          {
            _id: this.generateId(),
            text: `${msg} has left the room`,
            createdAt: new Date(),
            user: {
              _id: "woenfowienfowienfow",
              name: "Room Admin",
              avatar:
                "https://image.shutterstock.com/image-vector/bot-icon-chatbot-concept-cute-260nw-715418284.jpg"
            }
          }
        ])
      }));
    });

    this.setState({
      messages: [
        // {
        //   _id: 1,
        //   text: 'Hello developer',
        //   createdAt: new Date(),
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: 'https://placeimg.com/140/140/any',
        //   },
        // },
      ]
    });

    const listener = this.navigation.addListener("blur", () => {
      console.log("blur");
      this.socket.emit("leave", this.username);
    });
  }

  onSend(messages = []) {
    this.socket.emit("chat message", messages);
    console.log("message: ");
    console.log(messages);
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }

  generateId() {
    let count = 0;
    let randomString = "";

    while (count < 6) {
      let randomNumber = Math.floor(Math.random() * (122 - 48 + 1) + 48);
      let randomChar = "";

      if (randomNumber >= 58 && randomNumber <= 64) {
        continue;
      } else if (randomNumber >= 91 && randomNumber <= 96) {
        continue;
      } else {
        //convert to character
        randomChar = String.fromCharCode(randomNumber);
        randomString += randomChar;
        count++;
      }
    }

    return randomString;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.userId,
          avatar: this.avatar,
          name: this.username
        }}
        renderUsernameOnMessage={true}
        isTyping={true}
        showUserAvatar={true}
        listViewProps={styles.chatListView}
      />
    );
  }
}
