import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default (publicPageStyles = EStyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    width: Dimensions.get('window').width,
    justifyContent: 'space-between'
  },
  giftIcon: {
    marginRight: 10
  }
}));
