import EStyleSheet from 'react-native-extended-stylesheet';

export default (currentSelectorStyles = EStyleSheet.create({
  containerStyle: {
    paddingBottom: 20
  },
  pickerStyle: {
    marginLeft: 10,
    borderColor: '#cecece',
    borderBottomWidth: 1,
    height: 45
  },
  itemStyle: {
    color: '#cecece',
    height: 45,
    textAlign: 'left',
    fontSize: 16
  }
}));
