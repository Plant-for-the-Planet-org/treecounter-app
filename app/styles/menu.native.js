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
  topProfileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    width: '100%',
    marginTop: 10
  },
  burgerMenuImageStyle: {
    marginLeft: 20
  },
  profileImageStyle: {
    marginTop: 40
  },
  profileLogImageStyle: {
    marginTop: 40
  },
  profileTextHeading: {
    fontSize: 16,
    color: '$textColor',
    fontWeight: '600',
    marginTop: 5
  },
  profileText: {
    fontSize: 10,
    color: '$textColor'
  },
  centerMenu: {
    marginTop: 36
  },
  sideNavigationActionMenuContainer: {
    width: '100%'
  }
}));
