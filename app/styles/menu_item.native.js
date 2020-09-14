import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
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
  titleStyle: {
    borderRadius: 3,
    backgroundColor: '#707070',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 1,
    paddingBottom: 1,
    marginBottom: 3,
    fontSize: 12,
    color: '#FFFFFF'
  },
  groupMenuContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 10
  },
  textGroupContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingTop: 2
  },
  imageStyle: {
    width: 17,
    height: 18
  },
  largeImageStyle: {
    width: 24,
    height: 24
  },
  textStyle: {
    paddingLeft: 5,
    fontSize: 11,
    color: '#6a6161'
  },
  largeTextStyle: {
    fontSize: 14,
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
  },

  // Bottom Menu Related Styles:
  bottomMenuContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 12
  },
  bottomMenuItemContainer: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center'
  },
  bottomMenuItemImage: {
    height: 24,
    width: 24
  },
  bottomMenuItemText: {
    fontSize: 10,
    color: '$textColor'
  },
  selectedBottomMenuItemText: {
    color: '$colorPrimaryAccentLight',
    fontSize: 10
  }
});
