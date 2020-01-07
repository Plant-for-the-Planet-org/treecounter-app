import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  zeroPercentComissionContainer: {
    width: width * 0.556,
    height: width * 0.556,
    alignSelf: 'center',
    marginVertical: height <= 600 ? height * 0.036 : height * 0.061,
    justifyContent: 'center',
    alignItems: 'center'
  },
  zeroPercentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  commisionStyle: {
    fontFamily: 'OpenSans-Light',
    fontSize: 24,
    color: '#87b738',
    textAlign: 'center',
    marginTop: -24
  },
  zeroStyle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 90,
    color: '#87b738'
  },
  percentStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 40,
    color: '#87b738'
  },
  textHeader: {
    fontFamily: 'OpenSans-Bold',
    fontSize: height * 0.032,
    lineHeight: height * 0.032 * 1.375,
    textAlign: 'center',
    color: '#4d5153',
    marginTop: height * 0.099
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
  }
});
