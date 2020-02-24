import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  description: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#183152",
    flex: 0.15,
    fontSize: 18,
    color: "#666666"
  },
  buttons: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-evenly"
  },
  tags: {
    flex: 0.65,
    justifyContent: "center"
  }
});

export default styles;
