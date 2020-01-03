import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  legendInfoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  legendInfoText: {
    marginLeft: 6,
    fontSize: 10,
    fontFamily: 'OpenSans-Regular'
  },
  legendContainer: {
    marginTop: 22
  },
  legendWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
