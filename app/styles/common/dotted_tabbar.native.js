import EStyleSheet from 'react-native-extended-stylesheet';

export default (dottedtabbar = EStyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '$primary'
  },
  tabItemActive: {
    backgroundColor: '#ffffff',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    marginRight: 5
  },
  tabItem: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginRight: 5
  }
}));
