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
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    maxWidth: '70%'
  },
  headerImage: { height: 60, flex: 1 },
  caughtUpMessageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 30
  },
  caughtUpLine: {
    height: 1,
    flexGrow: 1,
    backgroundColor: '#c4c4c4'
  },
  caughtUpMessage: {
    fontFamily: 'OpenSans-Regular',
    color: '#6f6f6f'
  }
});
