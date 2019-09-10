import EStyleSheet from 'react-native-extended-stylesheet';

export default (tabbarStyles = EStyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#ffffff',
    justifyContent: 'center'
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
    fontSize: 12
  }
}));
