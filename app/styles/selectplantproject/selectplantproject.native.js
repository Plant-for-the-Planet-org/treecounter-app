import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectPlantTreeStyles = EStyleSheet.create({
  slickWrapper: {},

  cardContent: {
    width: '100%',
    flex: 1
  },

  plantProjectContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plantProjectContentFull: {
    flex: 0.8,
    width: '100%'
  },
  footer: {
    width: '100%',
    flex: 0.2,
    flexDirection: 'row'
  },
  plantProjectSelectButtonStyle: {
    height: 43,
    width: '80%',
    marginLeft: 25,
    marginRight: 40
  },
  plantProjectSelectTextStyle: {
    fontSize: 15
  }
}));
