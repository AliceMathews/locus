import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 0.35,
    padding: 20
  },
  thumbnail: {
    flex: 1,
    resizeMode: "contain"
  }
});

export default styles;
