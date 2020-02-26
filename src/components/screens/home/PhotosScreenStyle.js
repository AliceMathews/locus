import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  bannerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width
  },
  photosContainer: {
    flex: 6
  },
  banner: {
    width: 300,
    height: 75
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 30,
    color: "#183152"
  },
  toggle: {
    alignItems: "center",
    paddingRight: 30
  },
  proximity: {
    color: "#666666"
  }
});

export default styles;
