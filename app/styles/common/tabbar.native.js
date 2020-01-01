import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  tabItem: {},
  textActive: {
    backgroundColor: '#89b53a',
    height: 3,
    width: 75,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  textStyle: {
    color: '#4d5153',
    fontSize: 11,
    fontFamily: 'OpenSans-SemiBold',
    textTransform: 'capitalize',
    fontWeight: '300',
  }
});
