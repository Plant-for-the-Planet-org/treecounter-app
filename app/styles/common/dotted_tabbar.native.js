import EStyleSheet from 'react-native-extended-stylesheet';

export default (dottedtabbar = EStyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '$primary'
  },
  tabItemActive: {
    backgroundColor: '#ffffff',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    marginRight: 5
  },
  tabItem: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginRight: 5
  }
}));
