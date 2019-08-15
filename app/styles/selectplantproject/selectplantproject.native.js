import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectPlantTreeStyles = EStyleSheet.create({
  slickWrapper: {
    height: '100%'
  },

  cardContent: {
    width: '100%',
    flex: 1
  },

  plantProjectContent: {
    flex: 1,
    width: '100%'
  },
  plantProjectContentFull: {
    flex: 0.8,
    width: '100%'
  },
  footer: {
    width: '100%',
    flex: 0.2
  },
  selectedProjectRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectedProjectCol: {
    paddingLeft: 5
  }
}));
