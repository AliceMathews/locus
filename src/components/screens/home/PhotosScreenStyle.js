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
    justifyContent: 'center'
  },
  photosContainer: {
    flex: 6,
    justifyContent: "space-evenly"
  },
  banner: {
    width: 300,
    height: 75
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});

export default styles;
