import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  banner: {
    width: 300,
    height: 75
  },
  bannerContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex:1
    
  },
  categoriesContainer: {
    flex: 5
  },
  categoryTile: {
    margin: 5,
    width: '50%'
  },
  tilesContainer: {
    width: '50%',
    position: 'relative'
  }
});

export default styles;
