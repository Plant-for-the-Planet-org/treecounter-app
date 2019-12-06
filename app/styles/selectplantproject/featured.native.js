import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default EStyleSheet.create({
  cardStyle: {
    width: Layout.window.width - 30,
    padding: 0,
    paddingBottom: 10
  },
  flexContainer: {
    flexGrow: 1,
    paddingBottom: 90
  }
});
