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
    flex: 0.4,
    padding: 20
  },
  bottom: {
    flexDirection: "column",
    flex: 0.6,
    padding: 20,
    backgroundColor: "aliceblue"
  },
  imageInfo: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "space-evenly"
  },
  description: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  tagsContainer: {
    flex: 0.7,
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "blue",
    paddingTop: 20
  },
  buttons: {
    flex: 0.3,
    flexDirection: "row",
    // backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});

export default styles;
