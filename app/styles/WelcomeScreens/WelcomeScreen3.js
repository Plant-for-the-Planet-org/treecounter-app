import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textHeader: {
    fontFamily: 'OpenSans',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153'
  },
  imageStyle: {
    width: 200,
    height: 200
  },
  textPara: {
    fontFamily: 'OpenSans',
    fontSize: 17,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4d5153'
  }
});
