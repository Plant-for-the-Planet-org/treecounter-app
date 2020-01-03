import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default EStyleSheet.create({
  signInBtn: {
    color: '#87b738'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  textHeader: {
    fontFamily: 'OpenSans-Bold',
    fontSize: height * 0.032,
    lineHeight: height * 0.032 * 1.375,
    textAlign: 'center',
    color: '#4d5153',
    marginTop: height * 0.099
  },
  imageStyle: {
    width: width * 0.556,
    height: width * 0.556,
    marginVertical: height <= 600 ? height * 0.036 : height * 0.061,
    alignSelf: 'center'
  },
  textPara: {
    fontFamily: 'OpenSans-Regular',
    fontSize: height * 0.0264,
    lineHeight: height * 0.0264 * 1.375,
    textAlign: 'center',
    color: '#4d5153',
    maxWidth: '86.6%',
    left: '6.7%'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonStyle: {
    width: width * 0.867,
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
