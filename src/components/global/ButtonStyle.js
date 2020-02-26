import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#55708E",
    padding: 2,
    width: 100,
    margin: 3,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.74,
    shadowRadius: 3,
    elevation: 8
  },
  buttonBig: {
    alignItems: "center",
    backgroundColor: "#55708E",
    padding: 3,
    width: 150,
    height: 30,
    margin: 3,
    borderRadius: 5
  },
  label: {
    fontSize: 18,
    color: "white"
  }
});

export default styles;
