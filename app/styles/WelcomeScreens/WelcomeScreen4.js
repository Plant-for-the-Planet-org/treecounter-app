import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  zeroPercentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 48,
    alignItems: 'center'
  },
  commisionStyle: {
    fontFamily: 'OpenSans-Light',
    fontSize: 24,
    color: '#87b738',
    textAlign: 'center',
    marginBottom: 48,
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
    fontSize: 24,
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153',
    marginTop: 64
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
  }
});
