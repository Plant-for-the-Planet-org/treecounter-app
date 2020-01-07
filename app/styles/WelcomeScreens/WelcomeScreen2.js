import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
    // justifyContent: 'space-around'
  },
  textHeader: {
    fontFamily: 'OpenSans-Bold',
    // fontSize: 24,
    // lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153',
    marginTop: height * 0.099,
    fontSize: height * 0.032,
    lineHeight: height * 0.032 * 1.375
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
  }
});
