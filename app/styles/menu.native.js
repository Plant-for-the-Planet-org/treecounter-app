import EStyleSheet from 'react-native-extended-stylesheet';

export default (menuStyles = EStyleSheet.create({
  outerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  imageStyle: {
    paddingLeft: 43,
    paddingBottom: 20
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  },
  burgerMenuImageStyle: {
    width: 25,
    height: 25,
    marginLeft: 20
  },
  profileImageStyle: {
    width: 50,
    height: 50
  },
  profileTextHeading: {
    fontSize: 13,
    color: '$textColor',
    fontWeight: '600'
  },
  profileText: {
    fontSize: 13,
    color: '$textColor'
  },
  centerMenu: {
    marginTop: 22
  }
}));
