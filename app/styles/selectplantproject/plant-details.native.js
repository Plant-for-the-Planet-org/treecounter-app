import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  carousalContainer: { flexDirection: 'column' },
  descriptionContainer: {
    paddingTop: 15,
    marginTop: 12,
    width: '100%',
    marginBottom: 10,
    paddingBottom: 0
  },
  descriptionText: {
    color: '#4d5153',
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19,
    margin: 6
  },
  descriptionTextTitle: {
    color: '#4d5153',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 19,
    margin: 6
  },
  readmoreButtonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6
  },
  linkTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  linkIcon: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  linkText: { alignSelf: 'flex-end', color: '$colorPrimaryAccent' },
  videoContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 5
  },
  aboutHeader: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 19,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    color: '#4d5153',
    paddingBottom: 10
  },

  // Accordion

  accordionCardView: {
    borderRadius: 9,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 18,
    marginTop: 20,
    marginBottom: 20
  },
  accordionTitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    flexGrow: 1
  },
  accordionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  viewProfileText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  accordionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  iconTextRow: {
    flexDirection: 'row',
    marginTop: 12,
    width: '90%'
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 16
  }
});
