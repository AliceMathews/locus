import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",

    flex: 1
  },
  title: {
    fontSize: 20,
    color: "#666666",
    fontWeight: "400",
    paddingBottom: 10,
    textDecorationLine: "underline"
  },
  text: {
    fontSize: 18,
    color: "#666666",
    paddingVertical: 3
  },
  bold: {
    fontWeight: "700",
    color: "black"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export default styles;
