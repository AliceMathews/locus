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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 0.4,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#666666",
    padding: 60
  },
  bottom: {
    flexDirection: "column",
    flex: 0.6,
    padding: 20,
    backgroundColor: "#fff"
  },
  imageInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  description: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#183152",
    flex: 0.15,
    fontSize: 18,
    color: "#666666"
    // backgroundColor: "#e6f2ff"
  },
  tagsContainer: {
    flex: 0.65,
    flexDirection: "row",
    flexWrap: "wrap",

    paddingTop: 20,
    justifyContent: "space-evenly"
  },
  buttons: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-evenly"
  }
});

export default styles;
