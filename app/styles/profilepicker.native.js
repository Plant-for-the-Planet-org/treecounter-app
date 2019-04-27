import EStyleSheet from 'react-native-extended-stylesheet';

export default (editProfileStyle = EStyleSheet.create({
  buttonStyle: {
    borderColor: '#b8da8d',
    backgroundColor: '#b8da8d',
    borderWidth: 0,
    borderRadius: 6,
    padding: 10,
    margin: 0,
    height: 40
  },
  projectSnippetContainer: {
    flexDirection: 'column',

    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 0,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  primaryButtonText: {
    fontSize: 15
  },
  textStyle: {
    fontSize: 14,
    color: '$cardTextColor',
    maxWidth: '100%'
  },
  topCompetitorScore: {
    width: '40%'
  },
  topCompetitorName: {
    width: '60%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileImageStyle: {
    width: 40,
    height: 40,
    borderRadius: 0,
    borderWidth: 0,
    marginLeft: 10
  },
  participantNameContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 5
  },
  searchUserStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    justifyContent: 'space-between'
  }
}));
