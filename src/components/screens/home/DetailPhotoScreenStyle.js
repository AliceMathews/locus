import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  },
  map: {
    width: "100%",
    height: "50%"
  },
  icon: {
    height: 45,
    width: 45,
    borderRadius: 50
  },
  thumbnail: { height: 100, width: 100 },
  botContainer: {
    width: "100%",
    height: "50%"
  },
  botHeader: {
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  direction: {
    alignItems: "center"
  },
  info: {
    padding: 10
  },
  expanded: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});

export default styles;
