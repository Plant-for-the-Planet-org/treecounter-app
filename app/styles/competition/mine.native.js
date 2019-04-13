import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default (mine = EStyleSheet.create({
  cardStyle: {
    width: Layout.window.width - 30,
    padding: 0,
    paddingBottom: 10
  },
  mineContainer: {
    flex: 1
  },
  mineFContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  action_button: {
    color: '#ff6666'
  },
  mineFormContainer: {
    flexDirection: 'column',

    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  mineSpecsContainer: {
    height: Layout.window.height * 0.3,
    width: '100%'
  }
}));
