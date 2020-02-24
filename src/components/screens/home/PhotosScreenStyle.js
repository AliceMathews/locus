import { StyleSheet } from "react-native";

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
    justifyContent: "space-between"
  },
  photosContainer: {
    flex: 6
    // justifyContent: "space-evenly"
  },
  banner: {
    width: 300,
    height: 75
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: "bold",
    paddingRight: 20
  },
  toggle: {
    alignItems: "center"
  },
  proximity: {
    color: "#666666"
  }
});

export default styles;
