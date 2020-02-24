import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("screen").width * 0.9,
    paddingHorizontal: (Dimensions.get("screen").width * 0.9 - 312) / 2
  }
});

export default styles;
