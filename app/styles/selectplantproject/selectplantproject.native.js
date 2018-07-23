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
    flex: 0.9,
    width: '100%'
  },
  footer: {
    width: '90%',
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plantProjectSelectButton: {},
  plantProjectSelectButtonStyle: {
    height: 40,
    width: '70%'
  },
  plantProjectSelectTextStyle: {
    fontSize: 15
  }
}));
