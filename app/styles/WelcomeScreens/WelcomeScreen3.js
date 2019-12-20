import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export default EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'space-around',
  //   alignItems: 'center'
  // },
  textHeader: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153',
    marginTop: 64
  },
  imageStyle: {
    width: height * 0.33,
    height: height * 0.33,
    alignSelf: 'center',
    marginVertical: 42
  },
  textPara: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4d5153'
  }
});
