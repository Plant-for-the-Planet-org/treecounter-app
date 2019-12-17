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
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'italic',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
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
  }
});
