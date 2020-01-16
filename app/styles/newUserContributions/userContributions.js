import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 23
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subHeadContainer: {
    marginTop: 7
    // marginBottom: 27
  },
  subHeaderText: {
    color: '#4D5153',
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold'
  },
  italic: {
    fontStyle: 'italic'
  },

  icon: {
    width: 24,
    height: 24
  },
  iconContainer: {
    minWidth: 38,
    minHeight: 38,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40
  },
  treeCount: {
    fontSize: 27,
    color: '#4D5153',
    fontFamily: 'OpenSans-ExtraBold'
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
    // alignItems: 'center'
    // flex: 1
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
