import EStyleSheet from 'react-native-extended-stylesheet';

export default (tabbarStyles = EStyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ec6453',
    borderBottomWidth: 2
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  textActive: {
    color: '#ec6453',
    fontSize: 15
  },
  text: {
    color: '#aba2a2',
    fontSize: 15
  }
}));
