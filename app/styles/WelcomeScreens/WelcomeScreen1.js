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
    right: 10,
    top: 50
  },
  openAsGuest: {
    color: '#87b738',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 20
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
