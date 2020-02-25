import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
    borderWidth: 0,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  wrapper: {
    shadowColor: "#fff",
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 8
  },
  submitButton: {
    backgroundColor: "#55708E",
    padding: 10,
    margin: 15,
    alignItems: "center",
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8
  },
  submitButtonText: {
    color: "white"
  },
  model: {
    width: 300,
    height: 300,
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default styles;
