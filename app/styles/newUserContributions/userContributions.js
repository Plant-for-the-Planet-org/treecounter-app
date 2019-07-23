import EStyleSheet from 'react-native-extended-stylesheet';

export default (UserContributions = EStyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 20,
    paddingLeft: 16,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#d6d7da'
    // shadowColor: '#000',
    // shadowOpacity: 0.46,
    // shadowRadius: 11.14,
  },
  icon: {
    width: 10,
    height: 10
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
    marginTop: 4,
    fontSize: 14,
    color: '#666666'
  },
  buttonsWrapper: {
    flex: 1,
    justifyContent: 'space-between'
  },
  button: {
    alignItems: 'center',
    flex: 1
  },
  plantedButtonWrapper: {
    alignItems: 'center',
    backgroundColor: '#F1F6E7',
    borderBottomLeftRadius: 4
  },
  plantedText: {
    paddingVertical: 10,
    color: '#89b53a'
  }
}));
