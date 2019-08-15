import EStyleSheet from 'react-native-extended-stylesheet';

export default (buttonStyles = EStyleSheet.create({
  primaryButton: {
    height: 50,
    backgroundColor: '#a4c65e',
    borderColor: '#a4c65e',
    borderWidth: 1,
    borderRadius: 6,
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
}));
