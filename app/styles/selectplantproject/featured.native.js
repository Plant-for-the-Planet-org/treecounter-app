import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default (featured = EStyleSheet.create({
  cardStyle: {
    width: Layout.window.width * 0.95
  }
}));
