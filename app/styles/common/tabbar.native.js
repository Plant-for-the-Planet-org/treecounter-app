import EStyleSheet from 'react-native-extended-stylesheet';

export default (tabbarStyles = EStyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#ffffff'
  },
  tabItem: {
    padding: 0,
    width: 75
  },
  textActive: {
    color: '#ec6453',
    fontSize: 11,
    backgroundColor: '#ec6453',
    width: 75
  },
  textStyle: {
    color: '#aba2a2',
    fontSize: 11
  }
}));
