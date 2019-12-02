import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 20,
    paddingLeft: 16,
    marginLeft: 8,
    marginRight: 8,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#d5d5d5'
  },
  icon: {
    width: 25,
    height: 25
  },
  image: {
    width: 50,
    height: 50
  },
  treeCount: {
    fontSize: 25,
    color: '#89b53a',
    fontWeight: '700'
  },
  text: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 5
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
    backgroundColor: '#d5d5d5',
    borderBottomLeftRadius: 4
  },
  plantedText: {
    paddingVertical: 10,
    color: '#4d5153'
  },
  itemContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
