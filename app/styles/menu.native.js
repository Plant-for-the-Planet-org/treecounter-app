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
    width: 35,
    height: 35,
    borderRadius: 0,
    borderWidth: 0,
    marginLeft: 10
  },
  profileImageStyle: {
    width: 60,
    height: 60
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
  },
  sideNavigationActionMenuContainer: {
    width: '100%'
  }
}));
