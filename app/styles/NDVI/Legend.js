import EStyleSheet from 'react-native-extended-stylesheet';

export default (legendStyle = EStyleSheet.create({
  legendInfoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  legendInfoText: {
    marginLeft: 6,
    fontSize: 10
  },
  legendContainer: {
    marginTop: 22
  },
  legendWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
}));
