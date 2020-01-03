import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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
    top: height * 0.058,
    zIndex: 1,
    paddingRight: 20,
    paddingLeft: 14
  },
  openAsGuest: {
    color: '#87b738',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16
  },
  textHeader: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    lineHeight: 33,
    // fontSize: height * 0.032, experimental numbers
    // lineHeight: height * 0.032 * 1.5,
    textAlign: 'center',
    color: '#4d5153',
    marginVertical: height * 0.068
  },
  imageStyle: {
    width: width * 0.333,
    height: width * 0.333,
    alignSelf: 'center',
    marginTop: height * 0.1
  },
  textPara: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 17,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4d5153'
  }
});
