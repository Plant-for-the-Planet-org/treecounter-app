import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  widgetContainer: {
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  widgetTitleContainer: {
    backgroundColor: 'white',
    borderColor: '#4d5153',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: -13,
    zIndex: 1
  },
  widgetTitle: {
    fontSize: 14,
    fontFamily: 'OpenSans',
    color: '#4d5153'
  }
});
