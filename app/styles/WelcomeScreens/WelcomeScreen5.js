import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-around'
  },
  signInBtn: {
    color: '#87b738'
  },
  textHeader: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153'
  },
  imageStyle: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 15
  },
  textPara: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4d5153'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonStyle: {
    width: 312,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#89b53a'
  },
  alreadyHaveAccountBtn: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#4d5153'
  },
  lowerBtnStyle: {
    width: 312,
    height: 52,
    backgroundColor: 'white',
    borderWidth: 0
  },
  continueBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  }
});
