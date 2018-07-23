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
    width: '100%',
    alignSelf: 'center'
  },
  plantProjectSelectButton: {
    width: '80%',
    flex: 0.1,
    height: '20%'
  },
  plantProjectSelectButtonStyle: {
    height: 40,
    width: '70%'
  },
  plantProjectSelectTextStyle: {
    fontSize: 15
  }
}));
