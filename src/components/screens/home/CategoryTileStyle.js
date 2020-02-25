import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    opacity: 1
  },
  categoryTextContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  categoryTextBorder: {
    justifyContent: 'center',
    backgroundColor: 'rgba(247,237,237,0.25)',
    borderRadius: 10,
    padding: 5
  },
  categoryImage: {
    borderWidth: 2, 
    borderColor: 'rgba(247,237,237,0.5)',
    width: deviceWidth / 2,
    height: deviceWidth / 2
  }
});

export default styles;