import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  carousalContainer: { flexDirection: 'column' },
  descriptionContainer: {
    paddingTop: 15,

    marginTop: 12,
    width: '100%',
    marginBottom: 20,
    paddingBottom: 20
  },
  descriptionText: {
    color: '#686060'
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
  }
});
