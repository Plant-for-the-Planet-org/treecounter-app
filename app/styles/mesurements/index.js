import EStyleSheet from 'react-native-extended-stylesheet';

export default (Measurements = EStyleSheet.create({
  title: {
    paddingLeft: 16,
    paddingTop: 25,
    // color: "#99000000",
    fontSize: 14,
    lineHeight: 5
  },
  container: {
    marginTop: 13,
    marginBottom: 20,
    paddingLeft: 16,
    paddingBottom: 15,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#d5d5d5'
  },
  icon: {
    width: 25,
    height: 25
  }
}));
