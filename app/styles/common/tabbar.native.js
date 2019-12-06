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
  },

  headerView: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20
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
  headerImage: { height: 60, flex: 1 }
});
