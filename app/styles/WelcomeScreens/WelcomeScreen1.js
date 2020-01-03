import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  openAsGuestContainer: {
    position: 'absolute',
    left: 10,
    top: 50,
    zIndex: 1
  },
  openAsGuest: {
    color: '#87b738',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    paddingRight: 20,
    paddingLeft: 14,
    paddingTop: 10,
    paddingBottom: 16
  },
  textHeader: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153',
    marginVertical: 50
  },
  imageStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 64
  },
  textPara: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 17,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4d5153'
  }
});
