import EStyleSheet from 'react-native-extended-stylesheet';
export default (menuStyles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 40,
    paddingBottom: 10
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 3,
    paddingBottom: 10
  },
  largeMenuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  groupMenuContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 10
  },
  imageStyle: {
    width: 17,
    height: 18
  },
  largeImageStyle: {
    width: 25,
    height: 25
  },
  textStyle: {
    paddingLeft: 5,
    fontSize: 11,
    color: '#6a6161'
  },
  largeTextStyle: {
    paddingLeft: 5,
    fontSize: '1 rem',
    color: '$textColor'
  },
  gropuTextStyle: {
    fontWeight: '600',
    fontSize: 11,
    color: '#6a6161',
    marginBottom: 8
  },
  titleTextUnderline: {
    height: 2,
    width: 25,
    backgroundColor: '$primary',
    marginLeft: 2
  }
}));
