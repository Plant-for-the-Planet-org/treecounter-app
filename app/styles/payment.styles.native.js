import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default (paymentStyles = EStyleSheet.create({
  imageStyle: {
    width: 17,
    height: 18,
    resizeMode: 'contain'
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#0e7baa',
    color: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    height: 50
  },
  logoContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 30
  },
  logoStyle: {
    height: 30,
    resizeMode: 'contain'
  },
  content: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    // borderColor: '#0e7baa',
    // borderWidth: 1
  },
  headerText: {
    color: '#fff'
  }
}));
