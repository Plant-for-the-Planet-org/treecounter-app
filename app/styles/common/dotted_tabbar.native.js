import EStyleSheet from 'react-native-extended-stylesheet';

export default (dottedtabbar = EStyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
    backgroundColor: '$primary'
  },
  tabItemActive: {
    backgroundColor: '#ffffff',
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: 5
  },
  tabItem: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginRight: 5
  }
}));
