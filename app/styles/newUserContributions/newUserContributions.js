import EStyleSheet from 'react-native-extended-stylesheet';

export default (NewUserContributions = EStyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: '#d6d7da'
    // shadowColor: '#000',
    // shadowOpacity: 0.46,
    // shadowRadius: 11.14,
  },
  image: {
    width: 30,
    height: 30
  },
  treeCount: {
    fontSize: 25,
    color: '#89b53a',
    fontWeight: '700'
  },
  text: {
    fontSize: 14,
    color: '#666666'
  },
  button: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 20
  }
}));
