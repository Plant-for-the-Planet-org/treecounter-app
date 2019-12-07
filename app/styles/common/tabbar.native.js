import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#ffffff'
  },
  tabItem: {},
  textActive: {
    backgroundColor: '#89b53a',
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  textStyle: {
    color: '#aba2a2',
    fontSize: 11,
    fontFamily: 'OpenSans-SemiBold',
    textTransform: 'capitalize'
  }
});
