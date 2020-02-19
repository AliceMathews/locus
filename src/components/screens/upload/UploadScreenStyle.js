import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  top: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 0.35,
    padding: 20
  },
  bottom: {
    flexDirection: "column",
    flex: 0.65,
    padding: 20,
    backgroundColor: "aliceblue"
  },
  tagsContainer: {
    flex: 0.6,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "blue"
  },
  buttons: {
    flex: 0.4,
    flexDirection: "row",
    backgroundColor: "orange"
  }
});

export default styles;
