import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 60,
    marginTop: 80
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  },
  widgetContainer: {
    alignItems: 'center',
    marginVertical: 5,
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center'
  },
  image: {
    width: '70%',
    height: '70%'
  },
  widgetTitleContainer: {
    backgroundColor: 'white',
    borderColor: '#4d5153',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: -13,
    width: 110,
    height: 32,
    zIndex: 1,
    justifyContent: 'center'
  },
  widgetTitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: '#4d5153',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center'
  }
});
