import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -99,
    position: "absolute"
  }
});

export default styles;
