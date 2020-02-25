import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileInfoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  userPhotosContainer: {
    justifyContent: 'space-evenly',
    flex: 3
  },
  userName: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default styles;
