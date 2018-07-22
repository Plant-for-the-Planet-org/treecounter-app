import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectPlantTreeStyles = EStyleSheet.create({
  slickWrapper: {
    height: '100%'

    // width: '100%'
  },

  cardContent: {
    width: '100%',
    height: '100%'
  },

  plantProjectContent: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plantProjectContentFull: {
    height: '90%',
    width: '100%',
    alignSelf: 'center'
  },
  plantProjectSelectButton: {
    width: '80%',
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
