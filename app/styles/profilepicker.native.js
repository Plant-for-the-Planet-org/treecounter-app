import EStyleSheet from 'react-native-extended-stylesheet';

export default (editProfileStyle = EStyleSheet.create({
  buttonStyle: {
    borderColor: '#89b53a',
    backgroundColor: '#89b53a',
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
    padding: 5,
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
  textDedicateStyle: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'justify',
    color: '#4d5153'
  },
  textNotDedicateStyle: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'justify',
    color: '#4d5153',
    marginTop: 7,
    marginBottom: 5
  },
  topCompetitorScore: {
    width: '40%',
    marginTop: 5
  },
  topCompetitorName: {
    width: '60%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dedicateTreeName: {
    width: '100%'
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
  topCompetitorScoreText: {
    fontSize: 14,
    color: '$cardTextColor',
    maxWidth: '100%'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    justifyContent: 'center'
  },
  containerDedicateStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 25,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-between'
  },
  dedicateMyTree: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginBottom: 7
  },
  currentlyDedicatedTo: {
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 45
  }
}));
