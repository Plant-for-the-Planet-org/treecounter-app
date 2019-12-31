import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-around'
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
  }
});
