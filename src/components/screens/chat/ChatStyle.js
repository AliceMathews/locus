import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messagesContainer: {
    flex: 8
  },
  inputContainer: {
    flex: 2
  },
  input: {
    height: 50,
    borderWidth: 1, 
    position: 'absolute', 
    width: deviceWidth * 0.9,
    borderRadius: 10,
    borderColor: '#ccc',
    padding:10,
    fontSize: 16
  }
});

export default styles;