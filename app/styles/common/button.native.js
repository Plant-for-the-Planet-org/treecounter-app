import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  primaryButton: {
    height: 50,
    backgroundColor: '#89b53a',
    borderColor: '#89b53a',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButtonText: {
    fontSize: 25,
    color: 'white'
  },
  secondaryButton: {
    backgroundColor: '$colorPrimaryAccent',
    borderColor: '$colorPrimaryAccent'
  },
  followingButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorPrimaryAccent',
    height: 30,
    width: 100,
    marginRight: 10,
    padding: 5
  },
  followButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$primary',
    height: 30,
    width: 80,
    marginRight: 10,
    padding: 5
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 15
  },
  textContainer: {
    // width: '100%',
    flexDirection: 'row'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  image: {
    height: 30,
    width: 30
  }
});
