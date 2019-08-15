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
  },
  tableHeader: {
    flexDirection: 'row',
    height: 40
  },
  firstColumn: {
    flex: 1.5
  },
  secondColumn: {
    flex: 1
  },
  thirdColumn: {
    flex: 1
  },
  fourthColumn: {
    flex: 1,
    height: 30
  },
  supportText: {
    color: '#ec6453'
  }
}));
