import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  banner: {
    width: 300,
    height: 55
  },
  bannerContainer: {
    flex: 1
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  categoriesContainer: {
    flex: 5,
    justifyContent: "center"
  },
  categoryTile: {
    margin: 5
  },
  tilesContainer: {
    width: "50%",
    position: "relative"
  },
  categoryTitleStyle: {
    fontStyle: "italic",
    fontSize: 100
  }
});

export default styles;
