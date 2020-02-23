import React, { useState, useEffect, Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions
} from "react-native";

import io from "socket.io-client";

import { API_URL } from "../../../../configKeys";
import styles from "./ChatStyle";
import { ThemeProvider } from "@react-navigation/native";

// const socket = io("https://826a3840.ngrok.io");

// export default function Chat({ navgiation, route }) {
//   const { sendToId } = route.params;
//   // console.log(sendToId);

//   const [message, setMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   // const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // const newSocket = io("https://826a3840.ngrok.io");
//     // setSocket(newSocket);
//     // newSocket.on("chat message", msg => {
//     //   console.log(`message received in front end ${msg}`);
//     //   console.log(chatMessages);
//     //   setChatMessages([...chatMessages, msg]);
//     // });

//     socket.on("chat message", msg => {
//       setChatMessages([...chatMessages, msg]);
//       console.log(`message received in front end ${msg}`);
//       console.log(chatMessages);

//     });
//   },[]);

//   // console.log(socket);

//   // console.log(chatMessages);

//   const onSubmitEditing = () => {
//     // setChatMessages([...chatMessages, message]);
//     setMessage("");
//     socket.emit("chat message", message);
//   }

//   return (
//     <View style={styles.container}>
//         <View style={styles.messagesContainer}>
//           {/* <FlatList
//             data={chatMessages}
//             key={1}
//             renderItem={({ item }) => {
//               (<Text>hi</Text>)
//             }}
//           /> */}
//           {chatMessages.map((chat, idx) => {
//             return (<Text key={idx}>{chat}</Text>);
//           })}
//         </View>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={{height: 40, borderWidth: 2, width: 250, position: 'absolute'}}
//             autoCorrect={false}
//             value={message}
//             onSubmitEditing={onSubmitEditing}
//             onChangeText={msg => setMessage(msg)}
//           />
//         </View>
//     </View>
//   );
// }

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
    this.deviceWidth = Dimensions.get("window").width;
    this.room = "abc123";
    this.imageId = props.route.params.imageId;
    console.log(`image: ${this.imageId}`);
  }

  componentDidMount() {
    this.socket = io("https://076b68fe.ngrok.io");
    this.socket.on("connect", () => {
      this.socket.emit("room", this.imageId);
    });
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{ borderWidth: 2, fontSize: 20 }}>{chatMessage}</Text>
    ));

    return (
      <View style={styles.container}>
        <View style={styles.messagesContainer}>{chatMessages}</View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              height: 40,
              borderWidth: 2,
              position: "absolute",
              width: this.deviceWidth * 0.9
            }}
            autoCorrect={false}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({ chatMessage });
            }}
          />
        </View>
      </View>
    );
  }
}
