import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tag: {
    alignItems: "center",
    backgroundColor: "#6E89A6",
    padding: 3,
    paddingHorizontal: 10,
    width: 100,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    elevation: 3
  },
  label: {
    fontSize: 15,
    color: "white",
    width: "90%"
  }
});

export default styles;
